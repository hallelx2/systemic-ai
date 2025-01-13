"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain } from "lucide-react";
import { AnalysisResults } from "@/components/analysis/results";

interface ContentGeneratorFunctionResponse {
  data: {
    contentGeneratorFunction: string;
  }
}

interface ContentGeneratorFunctionVariables {
  topic: string;
  reviewType: string;
  description: string;
}

interface ResponseSection {
  section_title: string;
  section_content: string;
}

async function fetchContentGeneratorFunction(variables: ContentGeneratorFunctionVariables): Promise<string> {
  const response = await fetch('/api/content-generator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(variables)
  });

  if (!response.ok) {
    throw new Error('Failed to fetch content generator function');
  }

  const result = await response.json() as ContentGeneratorFunctionResponse;
  return result.data.contentGeneratorFunction;
}

export default function AnalysisPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [analysis, setAnalysis] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const pathName = usePathname();
  const type = pathName.split("/").pop();

  useEffect(() => {
    if (!data) return;

    const fetchData = async () => {
      try {
        const parsedData = JSON.parse(decodeURIComponent(data));
        const variables: ContentGeneratorFunctionVariables = {
          topic: parsedData.input.input,
          reviewType: type === 'quick' ? 'quick' : '',
          description: "Auto-generated analysis based on input",
        };

        // Simulate progress
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return prev;
            }
            return prev + 10;
          });
        }, 500);

        const result = await fetchContentGeneratorFunction(variables);
        const sections = JSON.parse(result) as ResponseSection[];
        console.log("Content generator function result:", sections);

        // Transform sections into the required format
        // const formattedAnalysis = {
        //   summary: sections.find(s => s.section_title.toLowerCase().includes('summary'))?.section_content ||
        //           "Analysis complete based on your input.",
        //   findings: sections
        //     .filter(s => !s.section_title.toLowerCase().includes('summary') &&
        //                 !s.section_title.toLowerCase().includes('recommendation'))
        //     .map(s => s.section_content),
        //   recommendations: sections
        //     .filter(s => s.section_title.toLowerCase().includes('recommendation'))
        //     .map(s => s.section_content)
        // };

        setAnalysis(sections);
        clearInterval(interval);
        setProgress(100);
      } catch (error) {
        console.error("Failed to fetch content generator:", error);
      }
    };

    fetchData();
  }, [data, type]);

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
