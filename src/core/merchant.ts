import { InvoiceStatus } from '../common'
import type { Database } from '../db'
import type { Fiber } from '../types/fiber'

export class Merchant {
  private _db: Database

  constructor(db: Database) {
    this._db = db
  }

  public list = async () => {
    return this._db.merchants.get_many()
  }

  public getCount = async () => {
    return this._db.merchants.get_count()
  }

  public get = async (id: string) => {
    return this._db.merchants.get_one(id)
  }

  public add = async (params: Fiber.Params.NewMerchant) => {
    return this._db.merchants.add_one(params)
  }

  public getInvoices = async (
    id: string,
    statusList?: Array<InvoiceStatus>,
    p?: { pageNo: number; pageSize: number },
  ) => {
    return this._db.merchants.get_invocies(
      id,
      statusList?.length ? statusList : undefined,
      p
        ? {
            page_no: p.pageNo,
            page_size: p.pageSize,
          }
        : undefined,
    )
  }

  public sync = async () => {}
}
