"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Recent Activity
          </div>
          <Link
            href="/dashboard/library"
            className="text-sm text-primary hover:underline flex items-center"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {/* Activity items will be populated here */}
            <p className="text-muted-foreground text-center py-8">
              No recent activity
            </p>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
