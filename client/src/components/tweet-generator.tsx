/**
 * TweetGenerator Component
 * 
 * A React component that handles user input and generates Kanye West style tweets
 * using the Groq AI API. Includes form validation and loading states.
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import TweetPreview from "./tweet-preview";
import { Loader2 } from "lucide-react";

interface FormData {
  prompt: string;
}

interface TweetMetrics {
  replies: number;
  retweets: number;
  likes: number;
  views: number;
  timestamp: string;
}

export default function TweetGenerator() {
  // State management for generated content
  const [generatedTweet, setGeneratedTweet] = useState<string>("");
  const [tweetMetrics, setTweetMetrics] = useState<TweetMetrics | null>(null);
  const { toast } = useToast();

  // Form handling with react-hook-form
  const form = useForm<FormData>({
    defaultValues: {
      prompt: "",
    },
  });

  /**
   * Generates random engagement metrics for the tweet
   * to simulate social media interaction
   */
  const generateMetrics = (): TweetMetrics => {
    const isHours = Math.random() > 0.5;
    return {
      replies: Math.floor(Math.random() * 10000),
      retweets: Math.floor(Math.random() * 50000),
      likes: Math.floor(Math.random() * 100000),
      views: Math.floor(Math.random() * 1000000),
      timestamp: isHours
        ? `${Math.floor(Math.random() * 23) + 1}h`
        : `${Math.floor(Math.random() * 59) + 1}m`,
    };
  };

  // API mutation for tweet generation
  const generateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await apiRequest("POST", "/api/generate", data);
      return res.json();
    },
    onSuccess: (data) => {
      setGeneratedTweet(data.content);
      setTweetMetrics(generateMetrics());
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate tweet. Please try again.",
      });
    },
  });

  // Form submission handler
  const onSubmit = (data: FormData) => {
    generateMutation.mutate(data);
  };

  // Clear form and generated content
  const handleClear = () => {
    form.reset();
    setGeneratedTweet("");
    setTweetMetrics(null);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Textarea
            placeholder="What should Kanye say? (Enter to Generate)"
            className="h-24 resize-none"
            {...form.register("prompt")}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {form.watch("prompt").length}/1000
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            disabled={generateMutation.isPending}
          >
            Clear
          </Button>
          <Button
            type="submit"
            disabled={generateMutation.isPending || !form.watch("prompt")}
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Tweet"
            )}
          </Button>
        </div>
      </form>

      {generatedTweet && tweetMetrics && (
        <TweetPreview
          content={generatedTweet}
          metrics={tweetMetrics}
        />
      )}
    </div>
  );
}