import type { FiberAgentService } from '../../../../types/fiber-agent-service'
import type { Currency } from '../../../../common'
import { FIBER_AGENT_API } from '../constants'

export const fetchInvoices = async (
  query?: Partial<{
    status_list: string
  }>,
) =>
  fetch(`${FIBER_AGENT_API}/invoices?${new URLSearchParams(query)}`)
    .then((res) => res.json())
    .then((res: FiberAgentService.Invoice.List.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })

export const fetchInvoice = async (paymentHash: string) =>
  fetch(`${FIBER_AGENT_API}/invoices/${paymentHash}`)
    .then((res) => res.json())
    .then((res: FiberAgentService.Invoice.One.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })

export const newInvoice = async (
  amount: bigint,
  description: string,
  currency: Currency,
  preimage: string | null,
  order?: {
    merchantId: string
    quota?: string
    detail: {
      description: string
    }
  },
  udt_type_script?: Record<'code_hash' | 'hash_type' | 'args', string>,
) => {
  if (!preimage && !order) throw new Error('Payment Preimage or order is required')
  return fetch(`${FIBER_AGENT_API}/invoices`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      amount: `0x${amount.toString(16)}`,
      description,
      currency,
      payment_preimage: preimage,
      hash_algorithm: 'sha256',
      order:
        !preimage && order
          ? {
              merchant_id: order.merchantId,
              quota: order.quota,
              detail: order.detail,
            }
          : null,
      udt_type_script,
    }),
  })
    .then((res) => res.json())
    .then((res: FiberAgentService.Invoice.Issue.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return {
        code: res.code,
        result: {
          address: res.result.invoice_address,
          paymentHash: res.result.invoice.data.payment_hash,
        },
        message: null,
      }
    })
}

export const cancelInvoice = async (paymentHash: string) => {
  return fetch(`${FIBER_AGENT_API}/invoices/${paymentHash}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((res: FiberAgentService.Invoice.Cancel.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })
}

export const archiveInvoice = async (paymentHash: string) => {
  return fetch(`${FIBER_AGENT_API}/invoices/${paymentHash}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      action: 'archive',
    }),
  })
    .then((res) => res.json())
    .then((res: FiberAgentService.Invoice.Archive.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })
}

export const fastPay = async (paymentHash: string, endpoint: string) => {
  return fetch(`${FIBER_AGENT_API}/invoices/${paymentHash}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      endpoint,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })
}
