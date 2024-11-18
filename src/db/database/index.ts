import { PGlite as Client } from '@electric-sql/pglite'
import { drizzle } from 'drizzle-orm/pglite'
import * as schema from '../schema'
import { Scripts } from './scripts'
import { Accounts } from './accounts'
import { Nodes } from './nodes'
import { Invoices } from './invoices'
import { Channels } from './channels'
import { Orders } from './orders'
import { Merchants } from './merchants'
import { UdtCfgs } from './udt-cfgs'
import { Events } from './events'
import { get_db_path } from '../utils'

const default_db_path = get_db_path()

export class Database {
  private static _db: ReturnType<typeof drizzle>
  private static _instance: Database
  private _scripts: Scripts
  private _accounts: Accounts
  private _nodes: Nodes
  private _invoices: Invoices
  private _channels: Channels
  private _orders: Orders
  private _merchants: Merchants
  private _udtCfgs: UdtCfgs
  private _events: Events

  public static get instance(): Database {
    if (!Database._instance) {
      Database._instance = new Database()
    }
    return Database._instance
  }

  public static get db() {
    if (!Database._db) {
      Database._instance = new Database()
    }
    return Database._db
  }

  public get scripts() {
    return this._scripts
  }

  public get accounts() {
    return this._accounts
  }

  public get nodes() {
    return this._nodes
  }

  public get invoices() {
    return this._invoices
  }

  public get channels() {
    return this._channels
  }

  public get orders() {
    return this._orders
  }

  public get merchants() {
    return this._merchants
  }

  public get udtCfgs() {
    return this._udtCfgs
  }

  public get events() {
    return this._events
  }

  private constructor(connection: string = default_db_path) {
    const client = new Client(connection)
    Database._db = drizzle(client)
    this._scripts = new Scripts(Database._db)
    this._accounts = new Accounts(Database._db, this._scripts)
    this._nodes = new Nodes(Database._db)
    this._invoices = new Invoices(Database._db)
    this._channels = new Channels(Database._db, this._scripts)
    this._orders = new Orders(Database._db)
    this._merchants = new Merchants(Database._db)
    this._udtCfgs = new UdtCfgs(Database._db)
    this._events = new Events(Database._db)
  }

  public clear_cache = async () => {
    await Database._db.delete(schema.nodes)
    await Database._db.delete(schema.channels)
    await Database._db.delete(schema.invoices)
    await Database._db.delete(schema.events)
  }
}

export default Database.instance
