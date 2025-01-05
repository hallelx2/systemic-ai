"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";
import { AnalysisResults } from "@/components/analysis/results";

export default function AnalysisPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [analysis, setAnalysis] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!data) return;

    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Mock analysis results
          setAnalysis({
            summary: "Analysis complete...",
            findings: ["Finding 1...", "Finding 2...", "Finding 3..."],
            recommendations: ["Recommendation 1...", "Recommendation 2..."],
          });
          return prev;
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  if (!data) {
    return <div>Invalid analysis request</div>;
  }

  if (!analysis) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-4">
            <Brain className="h-12 w-12 animate-pulse text-primary" />
            <CardTitle>Analyzing Research</CardTitle>
            <Progress value={progress} className="w-full max-w-xs" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return <AnalysisResults analysis={analysis} />;
}
