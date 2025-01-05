"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface ResearchWizardProps {
  onClose: () => void;
}

export function ResearchWizard({ onClose }: ResearchWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    topic: "",
    keywords: "",
    scope: "",
    timeframe: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    onClose();
  };

  return (
    <Card className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      <CardHeader>
        <CardTitle>Research Project Wizard</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Research Topic</Label>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
                placeholder="Enter your research topic"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input
                id="keywords"
                value={formData.keywords}
                onChange={(e) =>
                  setFormData({ ...formData, keywords: e.target.value })
                }
                placeholder="Enter keywords separated by commas"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scope">Research Scope</Label>
              <Textarea
                id="scope"
                value={formData.scope}
                onChange={(e) =>
                  setFormData({ ...formData, scope: e.target.value })
                }
                placeholder="Define the scope of your research"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeframe">Publication Timeframe</Label>
              <Input
                id="timeframe"
                value={formData.timeframe}
                onChange={(e) =>
                  setFormData({ ...formData, timeframe: e.target.value })
                }
                placeholder="e.g., Last 5 years"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Start Research</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
