"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Brain, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ResearchGenerator() {
  const [topic, setTopic] = useState("");
  const [focusAreas, setFocusAreas] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState("");

  async function handleGenerate() {
    if (!topic.trim()) {
      toast.error("Please enter a research topic");
      return;
    }

    setIsGenerating(true);
    const loadingToast = toast.loading("Generating research summary...");

    try {
      const response = await fetch("/api/research/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          focusAreas: focusAreas
            .split(",")
            .map(a => a.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate summary");
      }

      setSummary(data.summary);
      toast.dismiss(loadingToast);
      toast.success("Research summary generated!");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error instanceof Error ? error.message : "Failed to generate summary");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Research Generator
          </CardTitle>
          <CardDescription>
            Generate a comprehensive research summary using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Research Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Machine learning in medical imaging"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="focus">
              Focus Areas (optional, comma-separated)
            </Label>
            <Input
              id="focus"
              placeholder="e.g., CNN architectures, diagnostic accuracy, clinical trials"
              value={focusAreas}
              onChange={(e) => setFocusAreas(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Research Summary"
            )}
          </Button>
        </CardContent>
      </Card>

      {summary && (
        <Card>
          <CardHeader>
            <CardTitle>Research Summary</CardTitle>
            <CardDescription>
              AI-generated summary for: {topic}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap">{summary}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
