import { Hono } from 'hono'
import { peerRoute } from './peer'
import { channelRoute } from './channel'
import { invoiceRoute } from './invoice'
import { merchantRoute } from './merchant'
import { infoRoute } from './info'
import { eventRoute } from './event'

const apiRoute = new Hono()
apiRoute.route('/peers', peerRoute)
apiRoute.route('/channels', channelRoute)
apiRoute.route('/invoices', invoiceRoute)
apiRoute.route('/merchants', merchantRoute)
apiRoute.route('/info', infoRoute)
apiRoute.route('/events', eventRoute)

export { apiRoute }
