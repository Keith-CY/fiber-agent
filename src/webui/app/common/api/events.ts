import type { FiberAgentService } from '../../../../types/fiber-agent-service'
import { FIBER_AGENT_API } from '../constants'

export const fetchEvents = async () =>
  fetch(`${FIBER_AGENT_API}/events`)
    .then((res) => res.json())
    .then((res: FiberAgentService.Event.List.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })
