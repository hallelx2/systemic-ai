"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Define the ReviewType as a TypeScript enum-like object
export const ReviewType = {
  QuickReview: "quick",
  DetailedReport: "report",
  SystematicReview: "systematic",
  TechnicalGuide: "technical",
  Tutorial: "tutorial",
} as const;

type ReviewTypeKey = keyof typeof ReviewType;
type ReviewTypeValue = typeof ReviewType[ReviewTypeKey];

const REVIEW_TYPES: { id: ReviewTypeValue; label: string }[] = [
  { id: ReviewType.QuickReview, label: "Quick Review" },
  { id: ReviewType.DetailedReport, label: "Detailed Report" },
  { id: ReviewType.SystematicReview, label: "Systematic Review" },
  { id: ReviewType.TechnicalGuide, label: "Technical Guide" },
  { id: ReviewType.Tutorial, label: "Tutorial" },
];

interface ReviewOptionsStepProps {
  onNext: (data: ReviewTypeValue[]) => void;
  onBack: () => void;
}

export function ReviewOptionsStep({ onNext, onBack }: ReviewOptionsStepProps) {
  const [selectedOptions, setSelectedOptions] = useState<Set<ReviewTypeValue>>(
    new Set()
  );

  const toggleOption = (option: ReviewTypeValue) => {
    setSelectedOptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(option)) {
        newSet.delete(option);
      } else {
        newSet.add(option);
      }
      return newSet;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(Array.from(selectedOptions));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Review Type</Label>

            <div className="space-y-3">
              {REVIEW_TYPES.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={selectedOptions.has(type.id)}
                    onCheckedChange={() => toggleOption(type.id)}
                  />
                  <Label htmlFor={type.id}>{type.label}</Label>
                </div>
              ))}
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
