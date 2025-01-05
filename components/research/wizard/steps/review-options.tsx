"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ReviewOptionsStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function ReviewOptionsStep({ onNext, onBack }: ReviewOptionsStepProps) {
  const [options, setOptions] = useState({
    systematicReview: false,
    metaAnalysis: false,
    literatureReview: false,
    quickSummary: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(options);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Review Type</Label>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="systematic"
                  checked={options.systematicReview}
                  onCheckedChange={(checked) =>
                    setOptions((prev) => ({
                      ...prev,
                      systematicReview: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="systematic">Systematic Review</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="meta"
                  checked={options.metaAnalysis}
                  onCheckedChange={(checked) =>
                    setOptions((prev) => ({
                      ...prev,
                      metaAnalysis: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="meta">Meta-Analysis</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="literature"
                  checked={options.literatureReview}
                  onCheckedChange={(checked) =>
                    setOptions((prev) => ({
                      ...prev,
                      literatureReview: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="literature">Literature Review</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="quick"
                  checked={options.quickSummary}
                  onCheckedChange={(checked) =>
                    setOptions((prev) => ({
                      ...prev,
                      quickSummary: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="quick">Quick Summary</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
