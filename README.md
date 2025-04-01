# Tweet Like Kanye [ARCHIVED]

![image](https://github.com/user-attachments/assets/03880c08-2b05-4c38-91e2-1ae3374916af)

A dynamic web application that generates authentic Kanye West-style tweets using the Groq AI API. Experience the unique writing style of Ye with this parody tweet generator.

> **NOTICE: TWEETLIKEKANYE.COM WAS SOLD TO Namecheap user rouleau0x on March 25, 2025.**
> 
> **⚠️ THIS REPOSITORY IS READ-ONLY AND ARCHIVED**
> 
> This repository is maintained solely for archival and educational purposes following the domain sale. No further development or updates will be made to this codebase.

## Features

- 🎯 AI-powered tweet generation using Groq's advanced language models
- 💫 Authentic Kanye-style formatting, capitalization, and unique speech patterns
- 📱 Fully responsive design optimized for mobile, tablet, and desktop
- 📸 Download generated tweets as images for sharing on social media
- ⚡ Real-time tweet preview with simulated engagement metrics
- 💾 PostgreSQL database for storing generated tweets and prompts

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: Groq AI API with Mixtral-8x7B model
- **Styling**: Tailwind CSS + shadcn/ui components
- **Type Safety**: TypeScript with Zod validation
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **Image Generation**: html2canvas for tweet screenshots

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
# Required for AI functionality
GROQ_API_KEY=your_groq_api_key

# Required for database functionality
DATABASE_URL=your_postgresql_connection_string
```

4. Initialize the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

6. Open `http://localhost:3000` in your browser

## Project Structure

```
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/          # Reusable UI components (shadcn)
│   │   │   ├── tweet-generator.tsx  # Main tweet generation component
│   │   │   └── tweet-preview.tsx    # Tweet display component
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   └── pages/           # Page components
├── server/                  # Backend Express server
│   ├── db.ts                # Database connection
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API endpoints
│   └── storage.ts           # Data storage interface
├── shared/                  # Shared types and schemas
│   └── schema.ts            # Database schema and type definitions
└── migrations/              # Database migrations
```

## API Documentation

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

The prompt is processed by the Groq AI Mixtral-8x7B model with specific system prompts to generate authentic Kanye-style tweets. The API enforces Twitter's 280 character limit and ensures proper formatting.

## Implementation Details

- **AI Generation**: Uses Groq's Mixtral-8x7B model with temperature 0.98 for creative yet controlled output
- **Tweet Processing**: Automatic capitalization, spacing, and formatting to match Kanye's style
- **Database**: Stores all generated tweets and their original prompts
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Image Export**: Converts tweet cards to downloadable PNG images

## License

© 2025 • All rights reserved

## Domain Status

**TWEETLIKEKANYE.COM WAS SOLD TO Namecheap user rouleau0x on March 25, 2025.**

This project was previously available at tweetlikekanye.com, but as noted above, the domain has been sold and is no longer under our control. Any website currently operating at this domain is not affiliated with the original developers of this project.

## Disclaimer

This is a parody project for satire and commentary. It is not affiliated with, endorsed by, or sponsored by Kanye West or his representatives. All likenesses and trademarks are used under fair use for purposes of commentary and education. Use at your own risk; we disclaim all liability for any claims arising from our content.
