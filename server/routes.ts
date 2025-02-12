/**
 * API Routes for the Tweet Like Kanye application
 * This module handles API endpoints and Groq AI integration for tweet generation
 */

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTweetSchema, type GenerateTweetResponse } from "@shared/schema";
import { Groq } from "groq-sdk";
import { ZodError } from "zod";

const groq = new Groq();

/**
 * Custom error class for API errors
 */
class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Registers API routes for the Express application
 * @param app - Express application instance
 * @returns HTTP server instance
 */
export function registerRoutes(app: Express): Server {
  /**
   * Error handler middleware
   */
  const handleError = (err: Error, res: Express.Response) => {
    console.error("API Error:", err);

    if (err instanceof ZodError) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: err.errors,
      });
    }

    if (err instanceof APIError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  };

  /**
   * POST /api/generate
   * Generates a Kanye West style tweet using Groq AI
   * 
   * @body {string} prompt - User input to generate tweet from
   * @returns {Object} Generated tweet content
   * @throws {400} If prompt is invalid
   * @throws {500} If tweet generation fails
   */
  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt || typeof prompt !== "string") {
        throw new APIError("Invalid prompt", 400);
      }

      // Configure Groq AI for Kanye-style tweet generation
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are Kanye West (Ye). Take the user's prompt and transform it into a provocative Ye-style tweet:

RULES:
1. ALWAYS USE ALL CAPS
2. Keep tweets SHORT and IMPACTFUL - under 280 characters
3. Stay FOCUSED on the user's prompt - transform it but don't stray from the core topic
4. Separate related thoughts with TRIPLE SPACES
5. Be CONTROVERSIAL but MEANINGFUL
6. NO hashtags or quotation marks
7. NO emojis unless absolutely necessary
8. NEVER leave thoughts unfinished
9. NEVER include prefixes like "USER INPUT:" or "TWEET:"

EXAMPLES OF STYLE:
YOU KNOW WHO HATES BLACK PEOPLE THE MOST   BLACK PEOPLE   YOU KNOW WHO KILLS THE MOST BLACK PEOPLE   BLACK PEOPLE
SOME PEOPLE I LOVE   SOME PEOPLE I GOT LOVE FOR   I DONT HATE ANYONE I JUST DONT CARE ABOUT THEM ENOUGH TO HATE THEM
MY SALES DOUBLED SINCE LAST NIGHT   DAMN   THE WORLD MUST BE RACIST LIKE ME
EVERY RAPPER IS YE UNTIL YE SHOW UP

IMPORTANT: Take the user's exact words and transform them into maximum 2-3 connected thoughts in Ye's style. Don't add unrelated topics. Keep it focused but provocative.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.98,
        max_tokens: 150,
        top_p: 1,
      });

      const generatedTweet = completion.choices[0]?.message?.content?.trim().replace(/["']/g, '') || "";
      if (!generatedTweet) {
        throw new APIError("Failed to generate tweet content");
      }

      // Clean up metadata prefixes and format tweet
      const cleanedTweet = generatedTweet
        .replace(/^(USER INPUT|TWEET|OUTPUT):\s*/i, '')
        .replace(/^[^A-Z0-9]*/g, '');

      // Handle Twitter's character limit
      let finalTweet = cleanedTweet.slice(0, 280);

      // Ensure tweet ends at a complete thought
      if (finalTweet.length === 280) {
        const lastSpaceIndex = finalTweet.lastIndexOf('   ');
        if (lastSpaceIndex > 0) {
          finalTweet = finalTweet.slice(0, lastSpaceIndex);
        }
      }

      // Store and return the generated tweet
      const tweet = await storage.createTweet({
        content: finalTweet,
        prompt: prompt,
      });

      const response: GenerateTweetResponse = { content: tweet.content };
      res.json(response);
    } catch (error) {
      handleError(error as Error, res);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}