"use client";

import { useState } from "react";
import { ResearchInputStep } from "./steps/research-input";
import { ReviewOptionsStep } from "./steps/review-options";
import { AnalysisOptionsStep } from "./steps/analysis-options";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ResearchWizardProps {
  onComplete: (data: any) => void;
  onClose: () => void;
}

export function ResearchWizard({ onComplete, onClose }: ResearchWizardProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    input: {},
    review: {},
    analysis: {},
  });

  const handleStepComplete = (stepData: any) => {
    const newData = { ...data };

    switch (step) {
      case 1:
        newData.input = stepData;
        break;
      case 2:
        newData.review = stepData;
        break;
      case 3:
        newData.analysis = stepData;
        onComplete(newData);
        return;
    }

    setData(newData);
    setStep(step + 1);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Research Setup</CardTitle>
        <Progress value={(step / 3) * 100} className="mt-2" />
      </CardHeader>
      <CardContent>
        {step === 1 && <ResearchInputStep onNext={handleStepComplete} />}
        {step === 2 && (
          <ReviewOptionsStep
            onNext={handleStepComplete}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <AnalysisOptionsStep
            onNext={handleStepComplete}
            onBack={() => setStep(2)}
          />
        )}
      </CardContent>
    </Card>
  );
}
