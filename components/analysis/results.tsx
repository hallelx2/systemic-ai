"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare } from "lucide-react";
import Link from "next/link";

interface ResponseSchema {
  section_title: string;
  section_content: string;
}

interface AnalysisResultsProps {
  analysis: ResponseSchema[] | null; // analysis can be null or an array
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  // Fallback to an empty array if analysis is null or undefined
  const safeAnalysis = Array.isArray(analysis) ? analysis : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analysis Results</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/chat/new">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Discuss Results
            </Button>
          </Link>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {safeAnalysis.map((section, index) => (
          <div key={index} className="space-y-4">
            <div className="font-bold text-xl">{section.section_title}</div>
            <div className="text-md">{section.section_content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
