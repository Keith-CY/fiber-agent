import type { Fiber } from '../../core'
import { drizzle } from 'drizzle-orm/pglite'
import { desc, eq } from 'drizzle-orm'
import * as schema from '../schema'

export class Nodes {
  private _db: ReturnType<typeof drizzle>

  constructor(db: ReturnType<typeof drizzle>) {
    this._db = db
  }

  public get_many = async () => {
    return this._db.select().from(schema.nodes).orderBy(desc(schema.nodes.created_at))
  }

  public upsert = async (node: Fiber.NodeInfo, is_local: boolean) => {
    const data = schema.fromFiberNode(node, is_local)
    return this._db.insert(schema.nodes).values(data).onConflictDoUpdate({
      target: schema.nodes.peer_id,
      set: data,
    })
  }

  public remove = async (peer_id: string) => {
    return this._db.delete(schema.nodes).where(eq(schema.nodes.peer_id, peer_id))
  }
}
