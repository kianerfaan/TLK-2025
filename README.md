
# TLK-2025

A dynamic web application that generates authentic Ye-style tweets using the Groq AI API. Experience the unique writing style of Ye with this parody tweet generator.

> **NOTICE: TWEETLIKEKANYE.COM WAS SOLD TO Namecheap user rouleau0x on March 25, 2025.**
> 
> This repository contains the archived codebase of the original TLK application.

## Features

- 🎯 AI-powered tweet generation using Groq's Mixtral-8x7B model
- 💫 Authentic Kanye-style formatting and unique speech patterns
- 📱 Fully responsive design optimized for mobile, tablet, and desktop
- 📸 Download generated tweets as images for sharing
- ⚡ Real-time tweet preview with simulated engagement metrics

## Tech Stack

- **Frontend**: React.js + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: Groq AI API
- **Styling**: Tailwind CSS + shadcn/ui components
- **Type Safety**: TypeScript with Zod validation
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **Image Generation**: html2canvas

## Project Structure

```
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # Reusable UI components (shadcn)
│   │   │   ├── tweet-generator.tsx
│   │   │   └── tweet-preview.tsx
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── pages/          # Page components
├── server/                  # Backend Express server
│   ├── db.ts               # Database connection
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API endpoints
│   └── storage.ts          # Data storage interface
└── shared/                 # Shared types and schemas
    └── schema.ts           # Database schema definitions
```

## Development

The application uses npm for package management and runs on port 5000 in development.

To start the development server:

```bash
npm run dev
```

This starts both the frontend Vite server and backend Express server concurrently.

## API Endpoints

### POST /api/generate
Generates a Kanye West style tweet based on user input.

**Request Body**:
```json
{
  "prompt": "string"
}
```

**Response**:
```json
{
  "content": "string"
}
```

## Database Schema

The application uses a PostgreSQL database with the following schema:

```typescript
tweets = pgTable("tweets", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  prompt: text("prompt").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

## Deployment

The application is configured for deployment on Replit's infrastructure. The deployment configuration uses:

- Build Command: `npm run build`
- Run Command: `npm run dev`
- Port: 5000 (mapped to 80/443 in production)

## Legal Notice

TLK-2025, previously tweetlikekanye.com (sold to rouleau0x via Namecheap, March 25, 2025), is a satirical parody app inspired by tweetliketrump.com, not affiliated with the referenced individual. It uses likenesses and trademarks under fair use. Users assume all risk; liability is disclaimed. No personal data is collected.

## License

© 2025 All Rights Reserved. Archived under MIT License.
