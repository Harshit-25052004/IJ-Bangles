import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Collection validation schemas
export const collectionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  mainImage: z.string().min(1, "Main image is required"), // Can be URL or base64 data URL
  images: z.array(z.string().min(1)), // Can be URLs or base64 data URLs
  createdAt: z.string(),
});

export const insertCollectionSchema = collectionSchema.omit({ 
  id: true, 
  createdAt: true 
}).extend({
  id: z.string().optional(),
  createdAt: z.string().optional(),
});

export type Collection = z.infer<typeof collectionSchema>;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;
