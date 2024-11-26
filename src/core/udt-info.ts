import type { Database } from '../db'

export class UdtInfo {
  private _db: Database

  constructor(db: Database) {
    this._db = db
  }

  public list = async () => {
    return this._db.udtCfgs.get_many()
  }

  public setDecimal = async (script_hash: string, decimal: number) => {
    return this._db.udtCfgs.set_decimal(script_hash, decimal)
  }
}
