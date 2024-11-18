import { AccountRole } from '../common'
import type { Database } from '../db'
import type { Fiber } from '../types/fiber'

export class Account {
  private _db: Database

  constructor(db: Database) {
    this._db = db
  }

  public getAdmin = async () => {
    return this._db.accounts.get_one(AccountRole.Admin)
  }

  public setAdmin = async (closeScript: Fiber.Script) => {
    return this._db.accounts.set_one(AccountRole.Admin, closeScript)
  }
}
