import { Hono } from 'hono'
import { fiberAgent } from '../../core'
import { ChannelStateName, ServerResponseCode } from '../../common'

const infoRoute = new Hono()

infoRoute.get('/', async (c) => {
  const stats = await fiberAgent.channel.stats()
  const udtInfos = await fiberAgent.udtInfo.getMany()
  const localNode = await fiberAgent.peer.getInfo()

  const local_balance: Record<
    string,
    {
      balance: string
      udt_info: {
        name: string | null
        script_hash: string
        code_hash: string
        hash_type: 'data' | 'type' | 'data1' | 'data2'
        args: string
      } | null
    }
  > = {}

  Object.entries(stats).forEach(([tokenId, finance]) => {
    const udtInfo = tokenId === 'CKB' ? null : (udtInfos.find((u) => u.script_hash === tokenId) ?? null)
    const balance = finance[ChannelStateName.ChannelReady]?.local_balance ?? '0'
    local_balance[tokenId] = {
      balance: balance,
      udt_info: udtInfo,
    }
  })

  return c.json({
    code: ServerResponseCode.Success,
    result: {
      local_node: localNode,
      local_balance,
    },
  })
})

infoRoute.get('/admin', async (c) => {
  const admin = await fiberAgent.account.getAdmin()
  return c.json({
    code: ServerResponseCode.Success,
    result: admin,
  })
})

infoRoute.get('/channels', async (c) => {
  const balance = {
    pending: await fiberAgent.channel.getBalance(ChannelStateName.ChannelReady),
    finalized: await fiberAgent.channel.getBalance(ChannelStateName.Closed),
  }
  const count = await fiberAgent.channel.getCounts()
  return c.json({
    code: ServerResponseCode.Success,
    result: {
      balance,
      count,
    },
  })
})

infoRoute.get('/invoices', async (c) => {
  const count = await fiberAgent.invoice.getCounts()
  return c.json({
    code: ServerResponseCode.Success,
    result: {
      count,
    },
  })
})

infoRoute.get('/merchants', async (c) => {
  const count = await fiberAgent.merchant.getCount()
  return c.json({
    code: ServerResponseCode.Success,
    result: {
      count,
    },
  })
})

infoRoute.get('/finance', async (c) => {
  const channel = await fiberAgent.channel.stats()
  const udtInfos = await fiberAgent.udtInfo.getMany()
  return c.json({
    code: ServerResponseCode.Success,
    result: { channel, udt_info: udtInfos },
  })
})

infoRoute.get('/udt-info', async (c) => {
  const udtInfos = await fiberAgent.udtInfo.getMany()
  return c.json({
    code: ServerResponseCode.Success,
    result: udtInfos,
  })
})

export { infoRoute }
