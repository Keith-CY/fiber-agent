import type { Fiber } from '../../core'
import { drizzle } from 'drizzle-orm/pglite'
import { desc, eq, count, inArray, and, getTableColumns } from 'drizzle-orm'
import * as schema from '../schema'
import { EventTopic, EventType, InvoiceStatus } from '../../common'

export class Merchants {
  private _db: ReturnType<typeof drizzle>

  constructor(db: ReturnType<typeof drizzle>) {
    this._db = db
  }

  public get_many = async () => {
    return this._db.select().from(schema.merchants).orderBy(desc(schema.merchants.created_at))
  }

  public add_one = async ({ name, contact, description }: Fiber.Params.NewMerchant) => {
    const res = await this._db
      .insert(schema.merchants)
      .values({ name, contact, description })
      .returning({ id: schema.merchants.id })
      .then((res) => res[0])
    await this._db.insert(schema.events).values({
      topic: EventTopic.Merchant,
      type: EventType.New,
      target: res.id,
    })
    return res
  }

  public get_one = async (id: string) => {
    return this._db.select().from(schema.merchants).where(eq(schema.merchants.id, id)).limit(1)
  }

  public get_count = async () => {
    return this._db
      .select({
        count: count(),
      })
      .from(schema.merchants)
      .limit(1)
      .then((res) => res[0]?.count ?? 0)
  }

  public get_invocies = async (
    id: string,
    status_list: Array<InvoiceStatus> = [InvoiceStatus.Paid, InvoiceStatus.Open],
    { page_no, page_size }: Record<'page_no' | 'page_size', number> = { page_no: 1, page_size: 20 },
  ) => {
    const total = await this._db
      .select({ total: count() })
      .from(schema.merchants)
      .innerJoin(schema.orders, eq(schema.merchants.id, schema.orders.merchant_id))
      .innerJoin(schema.invoices, eq(schema.invoices.payment_hash, schema.orders.payment_hash))
      .where(and(eq(schema.merchants.id, id), inArray(schema.invoices.status, status_list)))
      .then((res) => res[0].total)

    const list = await this._db
      .select({
        ...getTableColumns(schema.invoices),
        orders: schema.orders,
      })
      .from(schema.merchants)
      .innerJoin(schema.orders, eq(schema.merchants.id, schema.orders.merchant_id))
      .innerJoin(schema.invoices, eq(schema.invoices.payment_hash, schema.orders.payment_hash))
      .where(and(eq(schema.merchants.id, id), inArray(schema.invoices.status, status_list)))
      .orderBy(desc(schema.invoices.timestamp))
      .offset((page_no - 1) * page_size)
      .limit(page_size)

    return {
      list,
      page: { total, page_no, page_size },
    }
  }
}
