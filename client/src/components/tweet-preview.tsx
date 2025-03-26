/**
 * TweetPreview Component
 * 
 * @module components/tweet-preview
 * @description Renders a Twitter-style card displaying the generated tweet with
 * engagement metrics and download functionality. This component is optimized for both
 * mobile and desktop views, providing a realistic social media post preview.
 * 
 * Key features:
 * - Responsive layout that mimics Twitter's interface
 * - Automatic formatting of large numbers (K, M suffixes)
 * - Screenshot functionality to download the tweet as an image
 * - Realistic engagement metrics display
 * 
 * @requires react
 * @requires html2canvas
 * @requires lucide-react
 * @requires @/components/ui/button
 * @requires @/components/ui/card
 * @requires @/hooks/use-toast
 */

import { useRef } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Tweet metrics data structure for display in the UI
 * Note: This is also defined in shared/schema.ts but duplicated here
 * to avoid circular dependencies
 * 
 * @interface TweetMetrics
 * @property {number} replies - Number of simulated replies
 * @property {number} retweets - Number of simulated retweets
 * @property {number} likes - Number of simulated likes
 * @property {number} views - Number of simulated views
 * @property {string} timestamp - Simulated time since posting (e.g., "2h", "5m")
 */
interface TweetMetrics {
  replies: number;
  retweets: number;
  likes: number;
  views: number;
  timestamp: string;
}

/**
 * Props for the TweetPreview component
 * 
 * @interface TweetPreviewProps
 * @property {string} content - The generated tweet text to display
 * @property {TweetMetrics} metrics - Engagement metrics to display with the tweet
 */
interface TweetPreviewProps {
  content: string;
  metrics: TweetMetrics;
}

export default function TweetPreview({ content, metrics }: TweetPreviewProps) {
  const tweetRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleDownload = async () => {
    if (!tweetRef.current) return;

    try {
      const canvas = await html2canvas(tweetRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "kanye-tweet.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate screenshot. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-4 w-full max-w-[500px] mx-auto px-2 sm:px-0">
      <Card className="p-3 sm:p-4" ref={tweetRef}>
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-gray-100/10 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
              <span className="font-bold text-sm sm:text-base">ye</span>
              <div className="w-4 h-4 sm:w-5 sm:h-5">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-yellow-500 fill-current">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/>
                </svg>
              </div>
              <span className="text-gray-500 text-xs sm:text-sm truncate">@kanyewest · {metrics.timestamp}</span>
            </div>
            <p className="text-base sm:text-xl mb-2 sm:mb-3 break-words">{content}</p>
            <div className="flex justify-between text-gray-600 text-xs sm:text-sm">
              <button className="flex items-center gap-1 hover:text-blue-500">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
                  <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.045.286.12.403.143.225.385.347.633.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"/>
                </svg>
                <span>{formatNumber(metrics.replies)}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-green-500">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
                  <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"/>
                </svg>
                <span>{formatNumber(metrics.retweets)}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-pink-500">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
                  <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.813-1.148 2.353-2.73 4.644-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"/>
                </svg>
                <span>{formatNumber(metrics.likes)}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
                  <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/>
                </svg>
                <span>{formatNumber(metrics.views)}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500 hidden sm:flex">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
                </svg>
              </button>
              <button className="flex items-center gap-1 hover:text-blue-500 hidden sm:flex">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
                  <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Card>
      <Button
        onClick={handleDownload}
        variant="outline"
        className="w-full"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Screenshot
      </Button>
    </div>
  );
}