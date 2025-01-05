"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Upload, Link as LinkIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ResearchInputStepProps {
  onNext: (data: any) => void;
}

export function ResearchInputStep({ onNext }: ResearchInputStepProps) {
  const [method, setMethod] = useState<"topic" | "paper" | "link">("topic");
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ method, input });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={method === "topic" ? "default" : "outline"}
              onClick={() => setMethod("topic")}
            >
              <Search className="mr-2 h-4 w-4" />
              Topic
            </Button>
            <Button
              type="button"
              variant={method === "paper" ? "default" : "outline"}
              onClick={() => setMethod("paper")}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Paper
            </Button>
            <Button
              type="button"
              variant={method === "link" ? "default" : "outline"}
              onClick={() => setMethod("link")}
            >
              <LinkIcon className="mr-2 h-4 w-4" />
              Paper Link
            </Button>
          </div>

          <div className="space-y-2">
            <Label>
              {method === "topic"
                ? "Research Topic"
                : method === "paper"
                  ? "Upload PDF"
                  : "Paper URL"}
            </Label>
            {method === "paper" ? (
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => setInput(e.target.value)}
              />
            ) : (
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  method === "topic"
                    ? "Enter research topic..."
                    : "Enter paper URL..."
                }
              />
            )}
          </div>
        </div>

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Card>
  );
}
