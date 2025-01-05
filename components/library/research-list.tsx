"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, BookOpen, File, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ResearchListProps {
  type: "all" | "reviews" | "papers" | "drafts";
}

export function ResearchList({ type }: ResearchListProps) {
  // Mock data - replace with real data fetching
  const items = [
    {
      id: 1,
      title: "AI in Healthcare: A Systematic Review",
      type: "review",
      date: "2024-03-20",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Machine Learning Applications in Medicine",
      type: "paper",
      date: "2024-03-19",
      status: "Completed",
    },
  ].filter((item) => type === "all" || item.type === type);

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No items found
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {item.type === "review" ? (
                  <BookOpen className="h-6 w-6 text-primary" />
                ) : item.type === "paper" ? (
                  <FileText className="h-6 w-6 text-primary" />
                ) : (
                  <File className="h-6 w-6 text-primary" />
                )}
                <div>
                  <Link
                    href={`/dashboard/library/${item.id}`}
                    className="font-medium hover:underline"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {item.date}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
