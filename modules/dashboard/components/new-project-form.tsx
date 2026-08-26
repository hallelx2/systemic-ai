"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function NewProjectForm() {
  const router = useRouter();
  const [step, setStep] = useState<"question" | "papers">("question");
  const [question, setQuestion] = useState("");
  const [papers, setPapers] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);

  const addPaperInput = () => {
    setPapers([...papers, ""]);
  };

  const removePaperInput = (index: number) => {
    setPapers(papers.filter((_, i) => i !== index));
  };

  const updatePaper = (index: number, value: string) => {
    const newPapers = [...papers];
    newPapers[index] = value;
    setPapers(newPapers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (step === "question" && question.trim()) {
      router.push(
        `/dashboard/analysis/new?question=${encodeURIComponent(question)}`,
      );
    } else if (step === "papers") {
      const validPapers = papers.filter((p) => p.trim());
      if (validPapers.length > 0) {
        router.push(
          `/dashboard/analysis/new?papers=${encodeURIComponent(JSON.stringify(validPapers))}`,
        );
      }
    }
  };

  return (
    <Card className="p-6 max-w-2xl">
      <div className="flex gap-4 mb-6">
        <Button
          variant={step === "question" ? "default" : "outline"}
          onClick={() => setStep("question")}
          className="flex-1"
        >
          Start with Question
        </Button>
        <Button
          variant={step === "papers" ? "default" : "outline"}
          onClick={() => setStep("papers")}
          className="flex-1"
        >
          Upload Papers
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === "question" ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="question">Research Question</Label>
              <Textarea
                id="question"
                placeholder="What is the effectiveness of mindfulness-based interventions for anxiety disorders?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                className="mt-2"
                required
              />
              <p className="text-xs text-muted-foreground mt-2">
                Our AI will search PubMed, analyze relevant papers, and generate a
                comprehensive review.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Label>Paper URLs or PMIDs</Label>
            {papers.map((paper, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="https://pubmed.ncbi.nlm.nih.gov/... or PMID"
                  value={paper}
                  onChange={(e) => updatePaper(index, e.target.value)}
                  className="flex-1"
                />
                {papers.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removePaperInput(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addPaperInput}
              className="w-full gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Another Paper
            </Button>
            <p className="text-xs text-muted-foreground">
              AI will analyze these papers and find related research automatically.
            </p>
          </div>
        )}

        <Button type="submit" className="w-full gap-2" disabled={loading}>
          <Sparkles className="w-4 h-4" />
          {loading ? "Starting Analysis..." : "Start AI Analysis"}
        </Button>
      </form>
    </Card>
  );
}
