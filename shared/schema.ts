import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Database schema for tweets table
 * Stores generated tweets and their original prompts
 */
export const tweets = pgTable("tweets", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  prompt: text("prompt").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Zod schema for tweet insertion
 * Used for validation when creating new tweets
 */
export const insertTweetSchema = createInsertSchema(tweets).pick({
  content: true,
  prompt: true,
});

/**
 * Type definitions for tweets
 */
export type InsertTweet = z.infer<typeof insertTweetSchema>;
export type Tweet = typeof tweets.$inferSelect;

/**
 * Interface for tweet metrics displayed in the UI
 */
export interface TweetMetrics {
  replies: number;
  retweets: number;
  likes: number;
  views: number;
  timestamp: string;
}

/**
 * Interface for API responses
 */
export interface GenerateTweetResponse {
  content: string;
  error?: string;
}

/**
 * Interface for API requests
 */
export interface GenerateTweetRequest {
  prompt: string;
}