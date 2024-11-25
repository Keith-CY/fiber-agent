import type { Fiber } from '../../core'
import { drizzle } from 'drizzle-orm/pglite'
import { desc, eq, inArray, count } from 'drizzle-orm'
import * as schema from '../schema'
import { EventTopic, EventType, InvoiceStatus } from '../../common'

export class Invoices {
  private _db: ReturnType<typeof drizzle>

  constructor(db: ReturnType<typeof drizzle>) {
    this._db = db
  }

  public get_one = async (payment_hash: string) => {
    return this._db
      .select()
      .from(schema.invoices)
      .leftJoin(schema.orders, eq(schema.invoices.payment_hash, schema.orders.payment_hash))
      .where(eq(schema.invoices.payment_hash, payment_hash))
      .limit(1)
      .then((res) => {
        const item = res[0]
        return {
          ...item.invoices,
          order: item.orders,
        }
      })
  }

  public get_many = async (
    status_list: Array<InvoiceStatus> = [InvoiceStatus.Paid, InvoiceStatus.Open],
    { page_no, page_size }: Record<'page_no' | 'page_size', number> = { page_no: 1, page_size: 20 },
  ) => {
    const total = await this._db
      .select({ total: count() })
      .from(schema.invoices)
      .where(inArray(schema.invoices.status, status_list))
      .then((res) => res[0].total)

    const list = await this._db
      .select()
      .from(schema.invoices)
      .leftJoin(schema.orders, eq(schema.invoices.payment_hash, schema.orders.payment_hash))
      .where(inArray(schema.invoices.status, status_list))
      .orderBy(desc(schema.invoices.timestamp))
      .offset((page_no - 1) * page_size)
      .limit(page_size)
      .then((res) =>
        res.map(({ invoices, orders }) => ({
          ...invoices,
          order: orders,
        })),
      )

    return {
      list,
      page: { total, page_no, page_size },
    }
  }

  public get_all_open = async () => {
    return this._db
      .select()
      .from(schema.invoices)
      .leftJoin(schema.orders, eq(schema.invoices.payment_hash, schema.orders.payment_hash))
      .where(inArray(schema.invoices.status, [InvoiceStatus.Open]))
      .orderBy(desc(schema.invoices.timestamp))
      .then((res) =>
        res.map(({ invoices, orders }) => ({
          ...invoices,
          order: orders,
        })),
      )
  }

  public get_counts = async () => {
    const res = await this._db
      .select({
        status: schema.invoices.status,
        count: count(),
      })
      .from(schema.invoices)
      .groupBy(schema.invoices.status)

    return res.reduce(
      (acc, cur) => {
        acc[cur.status] = cur.count
        return acc
      },
      {} as Record<string, number>,
    )
  }

  public add = async (params: Fiber.Params.NewInvoice, result: Fiber.NewInvoiceResult) => {
    const data = schema.fromFiberInvoice(params, result)
    await this._db.insert(schema.invoices).values(data)
    await this._db.insert(schema.events).values({
      topic: EventTopic.Invoice,
      type: EventType.New,
      target: data.payment_hash,
      quantity: data.amount,
      description: data.udt_type_script_hash,
    })
    return {
      address: result.invoice_address,
      paymentHash: result.invoice.data.payment_hash,
    }
  }

  public update_status = async (payment_hash: string, status: InvoiceStatus) => {
    const prev = await this.get_one(payment_hash)
    if (!prev || prev.status === status) return
    await this._db.update(schema.invoices).set({ status }).where(eq(schema.invoices.payment_hash, payment_hash))
    await this._db.insert(schema.events).values({
      topic: EventTopic.Invoice,
      type: EventType.Update,
      target: payment_hash,
      description: status,
    })
  }

  public cancel = async (payment_hash: string) => {
    const res = await this._db
      .update(schema.invoices)
      .set({ status: InvoiceStatus.Cancelled })
      .where(eq(schema.invoices.payment_hash, payment_hash))
    await this._db.insert(schema.events).values({
      topic: EventTopic.Invoice,
      type: EventType.Cancel,
      target: payment_hash,
    })
    return res
  }

  public remove = async (payment_hash: string) => {
    const res = await this._db.delete(schema.invoices).where(eq(schema.invoices.payment_hash, payment_hash))
    await this._db.insert(schema.events).values({
      topic: EventTopic.Invoice,
      type: EventType.Delete,
      target: payment_hash,
    })
    return res
  }

  public archive = async (payment_hash: string) => {
    const res = await this._db
      .update(schema.invoices)
      .set({
        status: InvoiceStatus.Archived,
      })
      .where(eq(schema.invoices.payment_hash, payment_hash))

    await this._db.insert(schema.events).values({
      topic: EventTopic.Invoice,
      type: EventType.Archive,
      target: payment_hash,
    })

    return res
  }
}
