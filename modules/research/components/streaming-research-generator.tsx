"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Loader2, StopCircle } from "lucide-react";
import { toast } from "sonner";

export function StreamingResearchGenerator() {
  const [topic, setTopic] = useState("");
  const [focusAreas, setFocusAreas] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedContent, setStreamedContent] = useState("");
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  async function handleGenerate() {
    if (!topic.trim()) {
      toast.error("Please enter a research topic");
      return;
    }

    setIsGenerating(true);
    setStreamedContent("");
    
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch("/api/research/generate-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          focusAreas: focusAreas
            .split(",")
            .map(a => a.trim())
            .filter(Boolean),
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;
        setStreamedContent(fullContent);
      }

      toast.success("Research summary generated!");
    } catch (error: any) {
      if (error.name === "AbortError") {
        toast.info("Generation stopped");
      } else {
        toast.error(error.message || "Generation failed");
      }
    } finally {
      setIsGenerating(false);
      setAbortController(null);
    }
  }

  function handleStop() {
    if (abortController) {
      abortController.abort();
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Research Generator (Streaming)
          </CardTitle>
          <CardDescription>
            Generate comprehensive research summaries with real-time streaming using Gemini 2.0
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isGenerating) {
                  handleGenerate();
                }
              }}
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

          <div className="flex gap-2">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="flex-1"
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
            
            {isGenerating && (
              <Button
                onClick={handleStop}
                variant="destructive"
                size="icon"
              >
                <StopCircle className="h-4 w-4" />
              </Button>
            )}
          </div>

          {isGenerating && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Streaming response from Gemini...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {streamedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Research Summary</CardTitle>
            <CardDescription>
              AI-generated summary for: {topic}
              {isGenerating && (
                <span className="ml-2 text-primary">
                  (Streaming in progress...)
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div 
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ 
                  __html: formatMarkdown(streamedContent) 
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Simple markdown formatter
function formatMarkdown(text: string): string {
  return text
    // Headers
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Bullet points
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    // Line breaks
    .replace(/\n/g, '<br />');
}
