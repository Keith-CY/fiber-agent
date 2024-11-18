import type { Database } from '../db'

export class UdtInfo {
  private _db: Database

  constructor(db: Database) {
    this._db = db
  }

  public getMany = async () => {
    return this._db.udtCfgs.get_many()
  }
}
