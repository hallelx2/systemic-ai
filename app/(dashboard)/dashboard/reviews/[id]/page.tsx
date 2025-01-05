"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText } from "lucide-react";
import Link from "next/link";

export default function ReviewPage() {
  // Destructure the id directly from useParams
  const { id } = useParams();

  // Mock data - replace with real data fetching
  const review = {
    id,
    title: "AI in Healthcare: Systematic Review",
    type: "systematic",
    date: "2024-03-20",
    status: "completed",
    summary:
      "This systematic review analyzed 50 papers on AI applications in healthcare...",
    findings: [
      "AI shows promising results in diagnostic applications",
      "Machine learning models achieve high accuracy in image analysis",
      "More research needed in clinical validation",
    ],
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{review.title}</h1>
          <p className="text-muted-foreground">Completed on {review.date}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/chat/${id}`}>
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Discuss
            </Button>
          </Link>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{review.summary}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Findings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              {review.findings.map((finding, index) => (
                <li key={index}>{finding}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
