import { drizzle } from 'drizzle-orm/pglite'
import { eq, getTableColumns } from 'drizzle-orm'
import * as schema from '../schema'

export class UdtCfgs {
  private _db: ReturnType<typeof drizzle>

  constructor(db: ReturnType<typeof drizzle>) {
    this._db = db
  }

  public get_one = async (script_hash: string) => {
    return this._db
      .select({
        ...getTableColumns(schema.udtCfgs),
        script: {
          code_hash: schema.scripts.code_hash,
          hash_type: schema.scripts.hash_type,
          args: schema.scripts.args,
        },
      })
      .from(schema.udtCfgs)
      .innerJoin(schema.scripts, eq(schema.udtCfgs.script_hash, schema.scripts.script_hash))
      .where(eq(schema.scripts.script_hash, script_hash))
      .limit(1)
      .then((res) => res[0])
  }

  public get_many = async () => {
    return this._db
      .select({
        ...getTableColumns(schema.udtCfgs),
        script: {
          code_hash: schema.scripts.code_hash,
          hash_type: schema.scripts.hash_type,
          args: schema.scripts.args,
        },
      })
      .from(schema.udtCfgs)
      .innerJoin(schema.scripts, eq(schema.udtCfgs.script_hash, schema.scripts.script_hash))
  }

  public upsert = async (script_hash: string, name?: string, is_allowed?: boolean) => {
    return await this._db
      .insert(schema.udtCfgs)
      .values({
        name,
        script_hash,
        is_allowed,
      })
      .onConflictDoUpdate({
        target: schema.udtCfgs.script_hash,
        set: {
          name,
        },
      })
  }

  public set_decimal = async (script_hash: string, decimal: number) => {
    return await this._db
      .update(schema.udtCfgs)
      .set({
        decimal: decimal.toString(),
      })
      .where(eq(schema.udtCfgs.script_hash, script_hash))
      .returning({
        script_hash: schema.udtCfgs.script_hash,
        decimal: schema.udtCfgs.decimal,
      })
  }
}
