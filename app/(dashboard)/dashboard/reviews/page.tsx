"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ReviewsPage() {
  // Mock data - replace with real data fetching
  const reviews = [
    {
      id: "1",
      title: "AI in Healthcare: Systematic Review",
      type: "systematic",
      date: "2024-03-20",
      status: "completed",
    },
    {
      id: "2",
      title: "Machine Learning in Medicine",
      type: "quick",
      date: "2024-03-19",
      status: "in_progress",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">
            Your completed and in-progress reviews
          </p>
        </div>
        <Link href="/dashboard">
          <Button>New Review</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Link key={review.id} href={`/dashboard/reviews/${review.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-medium">{review.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {review.date}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
