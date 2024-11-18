import { Hono } from 'hono'
import { zValidator as validator } from '@hono/zod-validator'
import { z } from 'zod'
import { fiberAgent } from '../../core'
import { ServerResponseCode } from '../../common'

const peerRoute = new Hono()

/**
 * Get Peer List
 **/
peerRoute.get('/', async (c) => {
  const result = await fiberAgent.peer.list()
  return c.json({ code: ServerResponseCode.Success, result })
})

const newPeerSchema = z.object({
  address: z.string(),
})

/**
 * Add Peer
 **/
peerRoute.post('/', validator('json', newPeerSchema), async (c) => {
  const body = await c.req.json()
  const { address } = body
  await fiberAgent.peer.connect(address)
  return c.json({ code: ServerResponseCode.Success, message: `Connect to peer ${address} successfully` }, 201)
})

/**
 * Remove Peer
 **/
peerRoute.delete('/:id', async (c) => {
  const id = c.req.param('id')
  await fiberAgent.peer.disconnect(id)
  return c.json({ code: ServerResponseCode.Success, message: `Peer ${id} is disconnected successfully` })
})

export { peerRoute }
