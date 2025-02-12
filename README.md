# Tweet Like Kanye

A dynamic web application that generates authentic Kanye West-style tweets using the Groq AI API. Experience the unique writing style of Ye with this parody tweet generator.

## Features

- 🎯 AI-powered tweet generation using Groq
- 💫 Authentic Kanye-style formatting and capitalization
- 📱 Fully responsive design (mobile-first)
- 📸 Download generated tweets as images
- ⚡ Real-time tweet preview with engagement metrics

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with Express
- **AI Integration**: Groq AI API
- **Styling**: Tailwind CSS + shadcn/ui
- **Type Safety**: TypeScript
- **State Management**: TanStack Query

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
GROQ_API_KEY=your_groq_api_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utility functions
│   │   └── pages/      # Page components
├── server/             # Backend Express server
│   ├── routes.ts      # API routes
│   └── storage.ts     # Data storage interface
└── shared/            # Shared types and schemas
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

## License

© 2025 Tweet Like Kanye • All rights reserved

## Disclaimer

This is a parody site for satire and commentary. It is not affiliated with, endorsed by, or sponsored by Kanye West or his representatives. All likenesses and trademarks are used under fair use. Use at your own risk; we disclaim all liability for any claims arising from our content.
