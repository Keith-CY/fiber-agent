import { pgEnum, pgTable, uuid, timestamp, varchar, numeric } from 'drizzle-orm/pg-core'
import { EventTopic, EventType } from '../../common'

export const eventTopicEnum = pgEnum('event_topic', Object.values(EventTopic) as [string, ...string[]])
export const eventTypeEnum = pgEnum('event_type', Object.values(EventType) as [string, ...string[]])

export const events = pgTable('events', {
  id: uuid().primaryKey().defaultRandom(),
  topic: eventTopicEnum().notNull(),
  type: eventTypeEnum().notNull(),
  target: varchar().notNull(),
  quantity: numeric({ precision: 39 }),
  description: varchar({ length: 255 }),
  timestamp: timestamp().defaultNow().notNull(),
})
