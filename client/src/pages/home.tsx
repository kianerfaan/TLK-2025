import TweetGenerator from "@/components/tweet-generator";
import { SiX } from "react-icons/si";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2 font-helvetica">
            ✨ TweetLikeKanye.Com
          </h1>
          <p className="text-lg text-white italic">
            "no one man should have all that power"
          </p>
        </header>

        <main className="max-w-2xl mx-auto">
          <TweetGenerator />
        </main>

        <footer className="text-center mt-12 text-white space-y-6">
          <div className="space-y-2">
            <p className="mb-2">© 2025 Tweet Like Kanye • All rights reserved</p>
            <p className="flex items-center justify-center gap-4">
              <span className="flex items-center gap-2">
                Built by{" "}
                <a
                  href="https://x.com/kianerfaan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 flex items-center gap-1"
                >
                  Kian Erfaan <SiX className="inline-block" />
                </a>
              </span>
              <span className="text-white">•</span>
              <span>
                Inspired by{" "}
                <a
                  href="https://tweetliketrump.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200"
                >
                  tweetliketrump.com
                </a>
              </span>
            </p>
          </div>

          <p className="text-sm text-white/80 max-w-2xl mx-auto px-4">
            tweetlikekanye.com is a parody site for satire and commentary. It is not affiliated with, endorsed by, or sponsored by Kanye West or his representatives. All likenesses and trademarks are used under fair use. Use at your own risk; we disclaim all liability for any claims arising from our content.
          </p>
        </footer>
      </div>
    </div>
  );
}