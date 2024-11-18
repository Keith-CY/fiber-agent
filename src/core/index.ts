export type { Fiber } from '../types/fiber'
import { FNN_ENDPOINT } from '../common'
import { db } from '../db'
import FiberAgent from './fiber-agent'

if (!FNN_ENDPOINT) {
  throw new Error('FNN Endpoint should be set in the env')
}

export const fiberAgent = new FiberAgent(FNN_ENDPOINT, db)
