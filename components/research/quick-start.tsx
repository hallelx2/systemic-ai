"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, BookOpen, FileText, ArrowRight } from "lucide-react";

interface QuickStartProps {
  onStartWizard: () => void;
  onQuickReview: () => void;
  onImport: () => void;
}

export function QuickStart({
  onStartWizard,
  onQuickReview,
  onImport,
}: QuickStartProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card
        className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={onStartWizard}
      >
        <div className="space-y-4">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">New Research</h3>
            <p className="text-sm text-muted-foreground">
              Start a guided research project
            </p>
          </div>
          <Button variant="ghost" className="w-full">
            Start Wizard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>

      <Card
        className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={onQuickReview}
      >
        <div className="space-y-4">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Quick Review</h3>
            <p className="text-sm text-muted-foreground">
              Analyze a single paper or topic
            </p>
          </div>
          <Button variant="ghost" className="w-full">
            Start Review <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>

      <Card
        className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={onImport}
      >
        <div className="space-y-4">
          <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Import Papers</h3>
            <p className="text-sm text-muted-foreground">
              Upload multiple papers for analysis
            </p>
          </div>
          <Button variant="ghost" className="w-full">
            Import <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
