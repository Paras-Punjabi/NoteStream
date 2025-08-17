import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const notebooks = pgTable("notebooks",{
    notebook_id:text().primaryKey().notNull().default(sql`gen_random_uuid()`),
    content : text().notNull().default(""),
    last_update : timestamp().defaultNow()
});

