import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "@/server/db/schema";

const pings = pgTable("ping", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").notNull(),
  parent_ping_id: uuid("parent_ping_id"),
  latitude: text("latitude").notNull().default("0.0"),
  longitude: text("longitude").notNull().default("0.0"),
  created_at: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const pingRelations = relations(pings, ({ one }) => ({
  user: one(users, {
    fields: [pings.user_id],
    references: [users.id],
  }),
  parentPing: one(pings, {
    fields: [pings.parent_ping_id],
    references: [pings.id],
  }),
}));

export default pings;
