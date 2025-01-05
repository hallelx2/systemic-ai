"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AnalysisOptionsStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function AnalysisOptionsStep({
  onNext,
  onBack,
}: AnalysisOptionsStepProps) {
  const [options, setOptions] = useState({
    aiAnalysis: true,
    dataExtraction: true,
    qualityAssessment: true,
    biasAnalysis: true,
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
            <Label className="text-lg font-semibold">Analysis Options</Label>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="ai">AI-Powered Analysis</Label>
                <Switch
                  id="ai"
                  checked={options.aiAnalysis}
                  onCheckedChange={(checked) =>
                    setOptions((prev) => ({ ...prev, aiAnalysis: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="data">Data Extraction</Label>
                <Switch
                  id="data"
                  checked={options.dataExtraction}
                  onCheckedChange={(checked) =>
                    setOptions((prev) => ({ ...prev, dataExtraction: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="quality">Quality Assessment</Label>
                <Switch
                  id="quality"
                  checked={options.qualityAssessment}
                  onCheckedChange={(checked) =>
                    setOptions((prev) => ({
                      ...prev,
                      qualityAssessment: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="bias">Bias Analysis</Label>
                <Switch
                  id="bias"
                  checked={options.biasAnalysis}
                  onCheckedChange={(checked) =>
                    setOptions((prev) => ({ ...prev, biasAnalysis: checked }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Start Analysis</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
