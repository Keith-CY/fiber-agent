import type { Database } from '../db'

export class FiberAgentEvent {
  private _db: Database

  constructor(db: Database) {
    this._db = db
  }

  public getMany = async (pageNo = 1, pageSize = 10) => {
    return this._db.events.get_many({ page_no: pageNo, page_size: pageSize })
  }
}
