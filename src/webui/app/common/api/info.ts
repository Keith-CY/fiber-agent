import type { FiberAgentService } from '../../../../types/fiber-agent-service'
import { FIBER_AGENT_API } from '../constants'

export const fetchInfo = async () =>
  fetch(`${FIBER_AGENT_API}/info`)
    .then((res) => res.json())
    .then((res: FiberAgentService.Info.Overview.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })

export const fetchAdmin = async () =>
  fetch(`${FIBER_AGENT_API}/info/admin`)
    .then((res) => res.json())
    .then((res: FiberAgentService.Info.Admin.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })

export const fetchFinance = async () =>
  fetch(`${FIBER_AGENT_API}/info/finance`)
    .then((res) => res.json())
    .then((res: FiberAgentService.Info.Finance.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })

export const fetchUdtInfo = async () =>
  fetch(`${FIBER_AGENT_API}/info/udt-info`)
    .then((res) => res.json())
    .then((res: FiberAgentService.Info.UdtInfo.Response) => {
      if (res.code) {
        throw new Error(res.error)
      }
      return res
    })
