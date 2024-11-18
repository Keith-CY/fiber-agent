import type { FiberAgentService } from '../../../../types/fiber-agent-service'
import { FIBER_AGENT_API } from '../constants'
export interface Merchant {
  id: string
  name?: string
  description?: string
  contact?: string
}

export const fetchMerchants = async () =>
  fetch(`${FIBER_AGENT_API}/merchants`)
    .then((res) => res.json())
    .then((res: FiberAgentService.Merchant.List.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })

export const addMerchant = async (params: Record<'name' | 'contact' | 'description', string>) => {
  return fetch(`${FIBER_AGENT_API}/merchants`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .then((res: FiberAgentService.Merchant.New.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })
}
