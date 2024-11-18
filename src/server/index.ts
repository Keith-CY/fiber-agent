import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
const app = new Hono()
import { apiRoute } from './routes'
import { fiberAgent } from '../core'
import { ServerResponseCode } from '../common'

app.use(
  '/api/*',
  cors({
    origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:8080', 'http://localhost:3000', 'http://localhost:8080'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'],
  }),
)

app.use('/public/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))

app.onError((err, c) => {
  console.error('Unhandled Exception: ', err)
  return c.json({ code: ServerResponseCode.Error, error: err.message })
})

app.route('/api', apiRoute)

fiberAgent.syncStart()

export default app
