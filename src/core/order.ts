import type { Database } from '../db'
import { Fiber } from '../types/fiber'

export class Order {
  private _db: Database

  constructor(db: Database) {
    this._db = db
  }

  public list = () => {
    return this._db.orders.get_many()
  }

  public addOne = async (order: Fiber.Params.NewOrder) => {
    return await this._db.orders.add_one(order)
  }
}
