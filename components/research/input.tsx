"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ResearchInput() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      // TODO: Implement research submission
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter PubMed link or research topic..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            <Search className="mr-2 h-4 w-4" />
            Research
          </Button>
        </div>
        <div className="text-center">
          <span className="text-sm text-muted-foreground">or</span>
        </div>
        <Button variant="outline" className="w-full" onClick={() => {}}>
          <Upload className="mr-2 h-4 w-4" />
          Upload PDF
        </Button>
      </form>
    </Card>
  );
}
