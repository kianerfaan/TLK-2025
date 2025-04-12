/**
 * Simplified API Routes
 */

import type { Express, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTweetSchema, type GenerateTweetResponse } from "@shared/schema";
import { ZodError } from "zod";

class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function registerRoutes(app: Express): Server {
  const handleError = (err: Error, res: Response) => {
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

  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt || typeof prompt !== "string") {
        throw new APIError("Invalid prompt", 400);
      }

      // Simple mock response without AI
      const mockTweet = prompt.toUpperCase() + "   YE OUT";

      const tweet = await storage.createTweet({
        content: mockTweet,
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