/**
 * Home Page Component
 * 
 * The main landing page for the Tweet Like Kanye application.
 * Displays the tweet generator with a colorful gradient background.
 * Contains information about domain ownership and disclaimer.
 */

import TweetGenerator from "@/components/tweet-generator";
import { SiX, SiGithub } from "react-icons/si";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-white font-helvetica">
              ✨ TLK
            </h1>
            <a
              href="https://github.com/kianerfaan/TLK-2025"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-blue-200"
            >
              <SiGithub className="w-6 h-6" />
            </a>
          </div>
          <p className="text-lg text-white italic">
            "no one man should have all that power"
          </p>
        </header>

        <main className="max-w-2xl mx-auto">
          <TweetGenerator />
        </main>

        <footer className="text-center mt-16 text-white">
          <div className="mb-8">
            <div className="text-sm pt-4 border-t border-white/20">
              <div className="flex items-center justify-center px-4 pb-2">
                <p className="text-xs text-white/80">
                  TLK-2025, previously tweetlikekanye.com (sold to rouleau0x via Namecheap, March 25, 2025), is a satirical parody app inspired by tweetliketrump.com, not affiliated with the referenced individual. It uses likenesses and trademarks under fair use. Users assume all risk; liability is disclaimed. No personal data is collected. Terms require legal compliance and prohibit misuse. Disputes: U.S. users – arbitration in Philadelphia, PA (AAA Consumer Rules); international users – arbitration in New York, NY (ICDR International Rules). Contact via public GitHub repository. © 2025 All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}