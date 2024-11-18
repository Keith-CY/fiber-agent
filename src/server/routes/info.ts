import { Hono } from 'hono'
import { fiberAgent } from '../../core'
import { ChannelStateName, ServerResponseCode } from '../../common'

const infoRoute = new Hono()

infoRoute.get('/', async (c) => {
  const channelBalance = fiberAgent.channel.balance
  const localNode = await fiberAgent.peer.getInfo()
  return c.json({
    code: ServerResponseCode.Success,
    result: {
      local_node: localNode,
      channel: {
        balance: Object.fromEntries(Array.from(channelBalance, ([k, v]) => [k, v.toString()])),
      },
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
