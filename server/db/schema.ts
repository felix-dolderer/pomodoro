import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const users = pgTable("User", {
  id: uuid("id").primaryKey().default(nanoid()),
  email: varchar("email", { length: 256 }).unique().notNull(),
  name: varchar("name", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
