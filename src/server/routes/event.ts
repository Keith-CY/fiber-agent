import { Hono } from 'hono'
import { fiberAgent } from '../../core'
import { ServerResponseCode } from '../../common'

const eventRoute = new Hono()

eventRoute.get('/', async (c) => {
  const events = await fiberAgent.event.getMany()

  return c.json({ code: ServerResponseCode.Success, result: events })
})

export { eventRoute }
