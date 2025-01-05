"use client";

import { useState } from "react";
import { ResearchWizard } from "@/components/research/wizard/index";
import { QuickReviewModal } from "@/components/research/quick-review";
import { ImportPapersModal } from "@/components/research/import-papers";
import { RecentActivity } from "@/components/research/recent-activity";
import { QuickStart } from "@/components/research/quick-start";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [showWizard, setShowWizard] = useState(false);
  const [showQuickReview, setShowQuickReview] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const handleWizardComplete = (data: any) => {
    // Start analysis and redirect to the analysis page
    router.push(
      `/dashboard/analysis/new?data=${encodeURIComponent(JSON.stringify(data))}`,
    );
  };

  const handleQuickReview = (data: any) => {
    router.push(
      `/dashboard/analysis/quick?data=${encodeURIComponent(JSON.stringify(data))}`,
    );
  };

  const handleImport = (data: any) => {
    router.push(
      `/dashboard/library/import?data=${encodeURIComponent(JSON.stringify(data))}`,
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Research Dashboard</h1>
        <p className="text-muted-foreground">
          Start a new research project or continue where you left off
        </p>
      </div>

      {showWizard ? (
        <ResearchWizard
          onComplete={handleWizardComplete}
          onClose={() => setShowWizard(false)}
        />
      ) : (
        <>
          <QuickStart
            onStartWizard={() => setShowWizard(true)}
            onQuickReview={() => setShowQuickReview(true)}
            onImport={() => setShowImport(true)}
          />
          <RecentActivity />
        </>
      )}

      <QuickReviewModal
        open={showQuickReview}
        onOpenChange={setShowQuickReview}
        onComplete={handleQuickReview}
      />

      <ImportPapersModal
        open={showImport}
        onOpenChange={setShowImport}
        onComplete={handleImport}
      />
    </div>
  );
}
