import type { Fiber } from '../../core'
import type { Scripts } from './scripts'
import { drizzle } from 'drizzle-orm/pglite'
import { eq } from 'drizzle-orm'
import * as schema from '../schema'
import { AccountRole, EventTopic, EventType } from '../../common'
import { scriptToHash } from '@nervosnetwork/ckb-sdk-utils'

export class Accounts {
  private _db: ReturnType<typeof drizzle>
  private _scripts: Scripts

  constructor(db: ReturnType<typeof drizzle>, scripts: Scripts) {
    this._db = db
    this._scripts = scripts
  }

  public get_one = async (role: AccountRole) => {
    const a = await this._db
      .select()
      .from(schema.accounts)
      .where(eq(schema.accounts.role, role))
      .leftJoin(schema.scripts, eq(schema.scripts.script_hash, schema.accounts.script_hash))
      .limit(1)
      .then((res) => res[0])
    if (!a) return null
    return {
      ...a.accounts,
      script: a.scripts,
    }
  }

  public set_one = async (role: AccountRole, script: Fiber.Script) => {
    const script_hash = scriptToHash({
      codeHash: script.code_hash,
      hashType: script.hash_type,
      args: script.args,
    })

    if (!(await this._scripts.get_one(script_hash))) {
      await this._scripts.upsert(script)
    }

    const account = await this.get_one(role)

    if (account) {
      await this._db.update(schema.accounts).set({ script_hash }).where(eq(schema.accounts.id, account.id))
      await this._db.insert(schema.events).values({
        topic: EventTopic.Account,
        type: EventType.Update,
        target: account.id,
        description: script_hash,
      })
    } else {
      const [{ id }] = await this._db
        .insert(schema.accounts)
        .values({ script_hash, role })
        .returning({ id: schema.accounts.id })
      await this._db.insert(schema.events).values({
        topic: EventTopic.Account,
        type: EventType.New,
        target: id,
        description: script_hash,
      })
    }
    return
  }
}
