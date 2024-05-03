import { relations, sql } from "drizzle-orm";
import { pgTable, text, time, pgEnum, json, serial } from "drizzle-orm/pg-core";

export const RoleEnum = pgEnum("roles", [
  "creator",
  "manager",
  "editor",
  "member",
]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  created_at: time("createdAt").defaultNow(),
  updated_at: time("updatedAt").$onUpdate(() => sql`current_timestamp`),
});

export type User = typeof users.$inferSelect;

export const userRelations = relations(users, ({ one, many }) => ({
  channels: many(channels),
}));

export const channels = pgTable("channels", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("imageUrl").notNull(),
  inviteCode: text("inviteCode"),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  created_at: time("createdAt").defaultNow(),
  updated_at: time("updatedAt").$onUpdate(() => sql`current_timestamp`),
});

export type DBChannel = typeof channels.$inferSelect;

export const channelsRelation = relations(channels, ({ one, many }) => ({
  user: one(users, {
    fields: [channels.userId],
    references: [users.id],
  }),
  members: many(members),
}));

export const members = pgTable("member", {
  id: text("id").primaryKey(),
  role: RoleEnum("role").default("member").notNull(),
  name: text("name").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  channelId: text("channelId")
    .notNull()
    .references(() => channels.id),
  created_at: time("createdAt").defaultNow(),
  updated_at: time("updatedAt").$onUpdate(() => sql`current_timestamp`),
});

export type dbMembers = typeof members.$inferSelect;

export const membersRelation = relations(members, ({ one, many }) => ({
  user: one(users, {
    fields: [members.userId],
    references: [users.id],
  }),
  channel: one(channels, {
    fields: [members.channelId],
    references: [channels.id],
  }),
}));
