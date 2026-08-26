"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  createdAt: Date;
  status: "in_progress" | "completed";
  paperCount: number;
}

interface RecentProjectsProps {
  projects: Project[];
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  if (projects.length === 0) {
    return (
      <Card className="p-8 text-center">
        <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="font-semibold mb-2">No projects yet</h3>
        <p className="text-sm text-muted-foreground">
          Create your first project to get started with AI-powered research
          analysis.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Recent Projects</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id} className="p-4 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium mb-1 line-clamp-1">{project.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div
                className={`px-2 py-1 rounded text-xs ${
                  project.status === "completed"
                    ? "bg-green-500/10 text-green-600"
                    : "bg-yellow-500/10 text-yellow-600"
                }`}
              >
                {project.status === "completed" ? "Complete" : "In Progress"}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {project.paperCount} papers
              </span>
              <Link href={`/dashboard/reviews/${project.id}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  View <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
