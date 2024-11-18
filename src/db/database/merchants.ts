import type { Fiber } from '../../core'
import { drizzle } from 'drizzle-orm/pglite'
import { desc, eq, count } from 'drizzle-orm'
import * as schema from '../schema'
import { EventTopic, EventType } from '../../common'

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
}
