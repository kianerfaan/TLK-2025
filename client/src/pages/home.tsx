/**
 * Home Page Component
 * 
 * The main landing page for the Tweet Like Kanye application.
 * Displays the tweet generator with a colorful gradient background.
 * Contains information about domain ownership and disclaimer.
 */

import TweetGenerator from "@/components/tweet-generator";
import { SiX } from "react-icons/si";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2 font-helvetica">
            ✨ Tweet Like Kanye
          </h1>
          <p className="text-lg text-white italic">
            "no one man should have all that power"
          </p>
          {/* Domain sale notice */}
          <div className="mt-4 p-3 bg-white/20 rounded-lg text-white text-sm">
            <p className="font-bold">
              NOTICE: TWEETLIKEKANYE.COM WAS SOLD TO Namecheap user rouleau0x on March 25, 2025.
            </p>
            <p className="text-xs mt-1">
              This is an archived version of the application.
            </p>
          </div>
        </header>

        <main className="max-w-2xl mx-auto">
          <TweetGenerator />
        </main>

        <footer className="text-center mt-16 text-white">
          <div className="space-y-4 mb-8">
            <p className="text-sm font-medium">
              Inspired by{" "}
              <a
                href="https://tweetliketrump.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200 underline underline-offset-2"
              >
                tweetliketrump.com
              </a>
            </p>
            <p className="text-sm text-white/80 max-w-2xl mx-auto px-4">
              This is a parody application for satire and commentary. It is not affiliated with, endorsed by, or sponsored by Kanye West or his representatives. All likenesses and trademarks are used under fair use for purposes of commentary and education. Use at your own risk; we disclaim all liability for any claims arising from our content.
            </p>
            <div className="text-sm space-y-2 pt-4 border-t border-white/20">
              <p>© 2025 All Rights Reserved</p>
              <p>
                <a
                  href="https://opensourcewebapps.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-blue-200 text-xs"
                >
                  opensourcewebapps.com
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}