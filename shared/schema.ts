/**
 * Tweet Like Kanye - Database Schema and Types
 * 
 * @module shared/schema
 * @description Defines the database schema, validation schemas, and shared types for the application.
 * This module serves as the single source of truth for data structures used across both
 * frontend and backend components.
 * 
 * @requires drizzle-orm/pg-core
 * @requires drizzle-zod
 * @requires zod
 */

import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Database schema for tweets table
 * Stores generated tweets and their original prompts
 * 
 * @property {number} id - Primary key, auto-incrementing ID for each tweet
 * @property {string} content - The generated Kanye-style tweet content
 * @property {string} prompt - The original user prompt used to generate the tweet
 * @property {Date} createdAt - Timestamp when the tweet was created
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
 * 
 * Excludes auto-generated fields (id, createdAt) and only includes
 * data that needs to be provided during tweet creation.
 */
export const insertTweetSchema = createInsertSchema(tweets).pick({
  content: true,
  prompt: true,
});

/**
 * Type definitions for tweets
 * 
 * InsertTweet: The shape of data required when creating a new tweet
 * Tweet: The shape of a tweet as retrieved from the database
 */
export type InsertTweet = z.infer<typeof insertTweetSchema>;
export type Tweet = typeof tweets.$inferSelect;

/**
 * Interface for tweet metrics displayed in the UI
 * 
 * These metrics are generated randomly for display purposes only
 * and are not stored in the database.
 * 
 * @property {number} replies - Number of simulated replies
 * @property {number} retweets - Number of simulated retweets
 * @property {number} likes - Number of simulated likes
 * @property {number} views - Number of simulated views
 * @property {string} timestamp - Simulated time since posting (e.g., "2h", "5m")
 */
export interface TweetMetrics {
  replies: number;
  retweets: number;
  likes: number;
  views: number;
  timestamp: string;
}

/**
 * Interface for API responses from the tweet generation endpoint
 * 
 * @property {string} content - The generated tweet content
 * @property {string} [error] - Optional error message if generation fails
 */
export interface GenerateTweetResponse {
  content: string;
  error?: string;
}

/**
 * Interface for API requests to the tweet generation endpoint
 * 
 * @property {string} prompt - The user input to transform into a Kanye-style tweet
 */
export interface GenerateTweetRequest {
  prompt: string;
}