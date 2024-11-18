import type { FiberAgentService } from '../../../../types/fiber-agent-service'
import { FIBER_AGENT_API } from '../constants'
export interface Channel {
  channel_id: string
  peer_id: string
  state_name: string
  local_balance: string
  remote_balance: string
  offered_tlc_balance: string
  received_tlc_balance: string
  funding_udt_type_script_hash: string | null
}

export const fetchChannels = async () =>
  fetch(`${FIBER_AGENT_API}/channels`)
    .then((res) => res.json())
    .then((res: FiberAgentService.Channel.List.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })

export const closeChannel = async (id: string, feeRate: number) =>
  fetch(`${FIBER_AGENT_API}/channels/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      fee_rate: feeRate,
    }),
  })
    .then((res) => res.json())
    .then((res: FiberAgentService.Channel.Delete.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })

export const openChannel = async (peerId: string, fundingAmount: bigint) => {
  return fetch(`${FIBER_AGENT_API}/channels`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      peer_id: peerId,
      funding_amount: `0x${fundingAmount.toString(16)}`,
    }),
  })
    .then((res) => res.json())
    .then((res: FiberAgentService.Channel.New.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })
}
