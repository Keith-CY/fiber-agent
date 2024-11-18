import { Hono } from 'hono'
import { zValidator as validator } from '@hono/zod-validator'
import { z } from 'zod'
import { fiberAgent } from '../../core'
import { ServerResponseCode } from '../../common'

const merchantRoute = new Hono()

/**
 * Get Merchant List
 **/
merchantRoute.get('/', async (c) => {
  const result = await fiberAgent.merchant.list()
  return c.json({ code: ServerResponseCode.Success, result })
})

const newMerchantSchema = z.object({
  name: z.string(),
  contact: z.string(),
  description: z.string(),
})

/**
 * Add Merchant
 **/
merchantRoute.post('/', validator('json', newMerchantSchema), async (c) => {
  const body = await c.req.json()
  const { name, contact, description } = body
  await fiberAgent.merchant.add({
    name,
    contact,
    description,
  })
  return c.json({ code: ServerResponseCode.Success, message: `Merchant ${name} is added` }, 201)
})

export { merchantRoute }