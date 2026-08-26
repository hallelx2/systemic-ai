"use client";

import { NewProjectForm } from "../components/new-project-form";
import { RecentProjects } from "../components/recent-projects";

interface DashboardViewProps {
  projects: Array<{
    id: string;
    title: string;
    createdAt: Date;
    status: "in_progress" | "completed";
    paperCount: number;
  }>;
}

export function DashboardView({ projects }: DashboardViewProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Research Dashboard</h1>
        <p className="text-muted-foreground">
          Start a new project or continue where you left off
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Create New Project</h2>
            <NewProjectForm />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <h3 className="font-semibold">How it works</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                    1
                  </span>
                  <span className="text-muted-foreground">
                    Enter a research question or upload papers
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                    2
                  </span>
                  <span className="text-muted-foreground">
                    AI searches & analyzes relevant research
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
                    3
                  </span>
                  <span className="text-muted-foreground">
                    Review findings & generate synthesis
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <RecentProjects projects={projects} />
    </div>
  );
}
