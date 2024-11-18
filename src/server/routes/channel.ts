import { Hono } from 'hono'
import { zValidator as validator } from '@hono/zod-validator'
import { z } from 'zod'
import { fiberAgent } from '../../core'
import { ServerResponseCode } from '../../common'

const channelRoute = new Hono()

/**
 * Get Channel List
 **/
channelRoute.get('/', async (c) => {
  const result = await fiberAgent.channel.list()
  return c.json({ code: ServerResponseCode.Success, result })
})

const newChannelSchema = z.object({
  peer_id: z.string(),
  funding_amount: z.string(),
})

/**
 * Add Channel
 **/
channelRoute.post('/', validator('json', newChannelSchema), async (c) => {
  const body = await c.req.json()
  const { peer_id, funding_amount } = body
  const tmpId = await fiberAgent.channel.open({ peerId: peer_id, fundingAmount: BigInt(funding_amount) })
  return c.json({ code: ServerResponseCode.Success, message: `Open channel with tmp id ${tmpId}` }, 201)
})

const closeChannelSchema = z.object({
  fee_rate: z.number().optional(),
  force: z.boolean().optional(),
  // close_script will be read from configuration
})

/**
 * Remove Channel
 **/
channelRoute.delete('/:id', validator('json', closeChannelSchema), async (c) => {
  const id = c.req.param('id')
  const { fee_rate: feeRate, force } = await c.req.json()
  await fiberAgent.channel.close({ channelId: id, feeRate, force })
  return c.json({ code: ServerResponseCode.Success, message: `Channel ${id} is closed successfully` })
})

export { channelRoute }
