import type { FiberAgentService } from '../../../../types/fiber-agent-service'
import { FIBER_AGENT_API } from '../constants'

export const fetchPeers = async () =>
  fetch(`${FIBER_AGENT_API}/peers`).then((res) => res.json() as Promise<FiberAgentService.Peer.List.Response>)

export const disconnectPeer = async (peerId: string) => {
  return fetch(`${FIBER_AGENT_API}/peers/${peerId}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((res: FiberAgentService.Peer.Delete.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })
}

export const connectPeer = async (address: string) => {
  return fetch(`${FIBER_AGENT_API}/peers`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ address }),
  })
    .then((res) => res.json())
    .then((res: FiberAgentService.Peer.New.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })
}
