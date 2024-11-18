import { count, desc } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/pglite'
import * as schema from '../schema'

export class Events {
  private _db: ReturnType<typeof drizzle>

  constructor(db: ReturnType<typeof drizzle>) {
    this._db = db
  }

  public get_many = async ({ page_no, page_size }: { page_no: number; page_size: number }) => {
    const total = await this._db
      .select({ total: count() })
      .from(schema.events)
      .then((res) => res[0].total)
    const list = await this._db
      .select()
      .from(schema.events)
      .orderBy(desc(schema.events.timestamp))
      .limit(page_size)
      .offset((page_no - 1) * page_size)
    return {
      list,
      page: { total, page_no, page_size },
    }
  }
}
