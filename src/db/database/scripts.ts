import type { Fiber } from '../../core'
import { drizzle } from 'drizzle-orm/pglite'
import { eq } from 'drizzle-orm'
import * as schema from '../schema'

export class Scripts {
  private _db: ReturnType<typeof drizzle>

  constructor(db: ReturnType<typeof drizzle>) {
    this._db = db
  }

  public get_one = async (script_hash: string) => {
    return this._db
      .select()
      .from(schema.scripts)
      .where(eq(schema.scripts.script_hash, script_hash))
      .limit(1)
      .then((res) => res[0])
  }

  public upsert = async (script: Fiber.Script) => {
    const data = schema.fromScript(script)
    await this._db.insert(schema.scripts).values(data).onConflictDoNothing({
      target: schema.scripts.script_hash,
    })
    return data
  }
}
