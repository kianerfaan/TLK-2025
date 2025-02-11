import { tweets, type Tweet, type InsertTweet } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getTweet(id: number): Promise<Tweet | undefined>;
  createTweet(tweet: InsertTweet): Promise<Tweet>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async getTweet(id: number): Promise<Tweet | undefined> {
    const [tweet] = await db.select().from(tweets).where(eq(tweets.id, id));
    return tweet || undefined;
  }

  async createTweet(insertTweet: InsertTweet): Promise<Tweet> {
    const [tweet] = await db
      .insert(tweets)
      .values(insertTweet)
      .returning();
    return tweet;
  }

  async getUser(id: number): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  async createUser(user: InsertUser): Promise<User> {
    throw new Error("Method not implemented.");
  }
}

export const storage = new DatabaseStorage();