"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PaperSummary {
  title: string;
  authors: string;
  summary: string;
  relatedPapers: Array<{
    title: string;
    pmid: string;
  }>;
}

export function HeroDemo() {
  const [pmid, setPmid] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PaperSummary | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pmid.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/research/analyze-paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pmid: pmid.trim() }),
      });

      if (!response.ok) throw new Error("Failed to analyze paper");

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to analyze paper. Please check the PMID and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 sm:p-8 bg-card border shadow-xl">
      <form onSubmit={handleAnalyze} className="flex gap-3 mb-6">
        <Input
          type="text"
          placeholder="Enter PubMed ID (e.g., 38234567)"
          value={pmid}
          onChange={(e) => setPmid(e.target.value)}
          className="flex-1 h-12 text-base"
          disabled={loading}
        />
        <Button type="submit" disabled={loading} size="lg" className="gap-2">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Analyze
            </>
          )}
        </Button>
      </form>

      {error && (
        <Card className="p-4 bg-destructive/10 border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      )}

      {result && (
        <div className="space-y-4 pt-4 border-t">
          <div>
            <h3 className="font-semibold text-lg mb-1">{result.title}</h3>
            <p className="text-sm text-muted-foreground">{result.authors}</p>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              AI Summary
            </h4>
            <p className="text-sm leading-relaxed">{result.summary}</p>
          </div>

          {result.relatedPapers.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Related Research</h4>
              <div className="space-y-2">
                {result.relatedPapers.slice(0, 3).map((paper, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-sm p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 mt-1 text-muted-foreground flex-shrink-0" />
                    <span className="flex-1">{paper.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <Link href="/register">
              <Button className="w-full gap-2">
                Sign up to save & analyze more papers
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      {!result && !error && (
        <p className="text-xs text-center text-muted-foreground">
          Enter any PubMed ID to see AI analysis in action
        </p>
      )}
    </Card>
  );
}
