import type { Database } from '../db'
import { FETCH_LIST_INTERVAL } from '../common'
import { Peer } from './peer'
import { Channel } from './channel'
import { Invoice } from './invoice'
import { Account } from './account'
import { Merchant } from './merchant'
import { Order } from './order'
import { FiberAgentEvent } from './event'
import { UdtInfo } from './udt-info'

export default class FiberAgent {
  private _db: Database
  private _timer: NodeJS.Timeout | undefined

  private _peer: Peer
  private _channel: Channel
  private _invoice: Invoice
  private _account: Account
  private _merchant: Merchant
  private _order: Order
  private _event: FiberAgentEvent
  private _udtInfo: UdtInfo

  public get peer() {
    return this._peer
  }
  public get channel() {
    return this._channel
  }

  public get invoice() {
    return this._invoice
  }

  public get account() {
    return this._account
  }

  public get merchant() {
    return this._merchant
  }

  public get order() {
    return this._order
  }
  public get event() {
    return this._event
  }

  public get udtInfo() {
    return this._udtInfo
  }

  constructor(uri: string, db: Database) {
    if (!uri) {
      throw new Error('RPC URL is not set')
    }
    this._db = db
    this._peer = new Peer(uri, db)
    this._channel = new Channel(uri, db)
    this._account = new Account(db)
    this._merchant = new Merchant(db)
    this._order = new Order(db)
    this._invoice = new Invoice(uri, db, this._merchant, this._order)
    this._event = new FiberAgentEvent(db)
    this._udtInfo = new UdtInfo(db)
  }

  public syncStart = () => {
    this.syncMetrics()
  }

  public syncStop = () => {
    if (!this._timer) return
    clearInterval(this._timer)
  }

  public clearCache = async () => {
    try {
      await this._db.clear_cache()
    } catch (e) {
      console.error(e)
    }
  }

  private syncMetrics = async () => {
    if (this._timer) {
      this.syncStop()
    }
    this._timer = setInterval(() => {
      try {
        this._peer.sync()
        this._channel.sync()
        this._invoice.sync()
      } catch {
        // ignore
      }
    }, FETCH_LIST_INTERVAL)
    this._peer.sync()
    this._channel.sync()
    this._invoice.sync()
  }
}
