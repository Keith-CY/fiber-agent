import { cors } from 'hono/cors'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
const app = new Hono()
import { apiRoute } from './routes'
import { fiberAgent } from '../core'
import { ServerResponseCode } from '../common'
import { readFile } from 'node:fs/promises'

app.use(
  '/api/*',
  cors({
    origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:8080', 'http://localhost:3000', 'http://localhost:8080'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'],
  }),
)

app.route('/api', apiRoute)

app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))

app.use('/*', serveStatic({ root: './public/webui' }))

app.get('/*', async (c) => {
  const subPath = c.req.path
  const filePath = `./public/webui${subPath}/index.html`
  try {
    const file = await readFile(filePath)
    return c.body(file, 200, { 'Content-Type': 'text/html' })
  } catch {
    return c.text('Not Found', 404)
  }
})

app.onError((err, c) => {
  console.error('Unhandled Exception: ', err)
  return c.json({ code: ServerResponseCode.Error, error: err.message })
})

fiberAgent.syncStart()

export default app

if (process.env.NODE_ENV !== 'production') {
  console.info(`Visit panel at http://127.0.0.1:3000/dashboard`)
}
