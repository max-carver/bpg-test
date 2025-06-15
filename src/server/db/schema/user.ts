import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { pings } from "@/server/db/schema";

export const roleEnum = pgEnum("role", ["User", "Admin"]);

const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  role: roleEnum("role").notNull().default("User"),
});

export const userRelations = relations(users, ({ many }) => ({
  pings: many(pings),
}));

export default users;
