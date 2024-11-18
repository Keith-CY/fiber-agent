import { drizzle } from 'drizzle-orm/pglite'
import { eq } from 'drizzle-orm'
import * as schema from '../schema'

export class UdtCfgs {
  private _db: ReturnType<typeof drizzle>

  constructor(db: ReturnType<typeof drizzle>) {
    this._db = db
  }

  public get_one = async (script_hash: string) => {
    return this._db
      .select()
      .from(schema.scripts)
      .leftJoin(schema.udtCfgs, eq(schema.udtCfgs.script_hash, schema.scripts.script_hash))
      .where(eq(schema.scripts.script_hash, script_hash))
      .limit(1)
      .then((res) => res[0])
      .then((res) => ({
        ...res.scripts,
        name: res['udt-cfgs']?.name ?? null,
      }))
  }

  public get_many = async () => {
    return this._db
      .select()
      .from(schema.scripts)
      .leftJoin(schema.udtCfgs, eq(schema.udtCfgs.script_hash, schema.scripts.script_hash))
      .limit(1)
      .then((res) =>
        res.map((item) => ({
          ...item.scripts,
          name: item['udt-cfgs']?.name ?? null,
        })),
      )
  }

  public upsert = async (script_hash: string, name?: string) => {
    await this._db
      .insert(schema.udtCfgs)
      .values({
        name,
        script_hash,
      })
      .onConflictDoUpdate({
        target: schema.udtCfgs.script_hash,
        set: {
          name,
        },
      })
  }
}
