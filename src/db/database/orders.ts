import type { Fiber } from '../../core'
import { drizzle } from 'drizzle-orm/pglite'
import { desc, eq, getTableColumns } from 'drizzle-orm'
import * as schema from '../schema'

export class Orders {
  private _db: ReturnType<typeof drizzle>

  constructor(db: ReturnType<typeof drizzle>) {
    this._db = db
  }

  public add_one = async (params: Fiber.Params.NewOrder) => {
    return this._db.insert(schema.orders).values(schema.fromOrder(params))
  }

  public get_one = async (payment_hash: string) => {
    return this._db.select().from(schema.orders).where(eq(schema.orders.payment_hash, payment_hash)).limit(1)
  }

  public get_many = async () => {
    return this._db
      .select({
        ...getTableColumns(schema.orders),
        invoice: schema.invoices,
      })
      .from(schema.orders)
      .leftJoin(schema.invoices, eq(schema.invoices.payment_hash, schema.orders.payment_hash))
      .orderBy(desc(schema.orders.created_at))
  }
}
