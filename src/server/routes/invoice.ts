import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { zValidator as validator } from '@hono/zod-validator'
import { z } from 'zod'
import { fiberAgent } from '../../core'
import { type InvoiceStatus, ServerResponseCode } from '../../common'

const invoiceRoute = new Hono()

/**
 * Get Invoice List
 **/
invoiceRoute.get('/', async (c) => {
  const pageNo = c.req.query('page_no')
  const pageSize = c.req.queries('page_size')
  const _sl = c.req.query('status_list')
  const statusList = _sl ? (_sl.split(',') as Array<InvoiceStatus>) : undefined

  const result = await fiberAgent.invoice.list(statusList, {
    pageNo: +(pageNo || 1),
    pageSize: +(pageSize || 20),
  })
  return c.json({ code: ServerResponseCode.Success, result })
})

/**
 * Get One Invoice
 **/
invoiceRoute.get('/:payment_hash', async (c) => {
  const paymentHash = c.req.param('payment_hash')

  const result = await fiberAgent.invoice.get(paymentHash)
  return c.json({ code: ServerResponseCode.Success, result })
})

const newInvoiceSchema = z.object({
  amount: z.string(),
  description: z.string().optional(),
  currency: z.enum(['Fibb', 'Fibt', 'Fibd']),
  expiry: z.number().optional(),
  fallback_address: z.string().optional(),
  final_cltv: z.number().optional(),
  udt_type_script: z
    .object({
      code_hash: z.string(),
      hash_type: z.enum(['data', 'type']),
      args: z.string(),
    })
    .optional()
    .nullable(),
  hash_algorithm: z.enum(['sha256']),
  payment_preimage: z.string().optional().nullable(),
  order: z
    .object({
      merchant_id: z.string(),
      quota: z.string().optional(),
      detail: z.record(z.string()).optional(),
    })
    .optional()
    .nullable(),
})

/**
 * Add Invoice
 **/
invoiceRoute.post('/', validator('json', newInvoiceSchema), async (c) => {
  const body = await c.req.json()
  const {
    amount,
    description,
    currency,
    payment_preimage: paymentPreimage,
    expiry,
    fallback_address: fallbackAddress,
    final_cltv: finalCltv,
    udt_type_script: udtTypeScript,
    hash_algorithm: hashAlgorithm,
    order,
  } = body

  const result = await fiberAgent.invoice.issue(
    {
      amount: BigInt(amount),
      description,
      currency,
      paymentPreimage,
      expiry,
      fallbackAddress,
      finalCltv,
      hashAlgorithm,
      udtTypeScript,
    },
    order,
  )
  return c.json({ code: ServerResponseCode.Success, result }, 201)
})

/**
 * Cancel Invoice
 **/
invoiceRoute.delete('/:id', async (c) => {
  const id = c.req.param('id')
  await fiberAgent.invoice.cancel(id)
  return c.json({ code: ServerResponseCode.Success, message: `Invoice ${id} is cancelled successfully` })
})

/**
 * Archive Invoice
 **/
invoiceRoute.put('/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  switch (body.action) {
    case 'archive': {
      await fiberAgent.invoice.archive(id)
      return c.json({ code: ServerResponseCode.Success, message: `Invoice ${id} is archived successfully` })
    }
    default: {
      throw new HTTPException(400, {
        message: 'Unknown action to update invoice',
      })
    }
  }
})

/**
 * Fast Pay
 **/
invoiceRoute.post(
  '/:id',
  validator(
    'json',
    z.object({
      endpoint: z.string(),
    }),
  ),
  async (c) => {
    const id = c.req.param('id')
    const invoice = await fiberAgent.invoice.get(id)

    if (!invoice) {
      return c.json(
        {
          code: ServerResponseCode.Error,
          error: `Invioce not found`,
        },
        400,
      )
    }

    const body = await c.req.json()
    const { endpoint } = body

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'send_payment',
        params: [{ invoice: invoice.address }],
      }),
    }).then((res) => res.json())
    if (res.error) {
      return c.json(
        {
          code: ServerResponseCode.Error,
          error: JSON.stringify(res.error),
        },
        400,
      )
    }
    return c.json({
      code: ServerResponseCode.Success,
      result: res.result,
    })
  },
)

export { invoiceRoute }
