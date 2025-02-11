import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTweetSchema } from "@shared/schema";
import { Groq } from "groq-sdk";

const groq = new Groq();

export function registerRoutes(app: Express): Server {
  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ message: "Invalid prompt" });
      }

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

      // Clean up any metadata prefixes that might appear
      const cleanedTweet = generatedTweet
        .replace(/^(USER INPUT|TWEET|OUTPUT):\s*/i, '')
        .replace(/^[^A-Z0-9]*/g, ''); // Remove any non-alphanumeric prefixes

      // Ensure tweet doesn't exceed Twitter's limit
      let finalTweet = cleanedTweet.slice(0, 280);

      // If the tweet was cut off mid-sentence, find the last complete thought
      if (finalTweet.length === 280) {
        const lastSpaceIndex = finalTweet.lastIndexOf('   ');
        if (lastSpaceIndex > 0) {
          finalTweet = finalTweet.slice(0, lastSpaceIndex);
        }
      }

      const tweet = await storage.createTweet({
        content: finalTweet,
        prompt: prompt,
      });

      res.json({ content: tweet.content });
    } catch (error) {
      console.error("Error generating tweet:", error);
      res.status(500).json({ message: "Failed to generate tweet" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}