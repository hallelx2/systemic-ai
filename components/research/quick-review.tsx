"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface QuickReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: any) => void;
}

export function QuickReviewModal({
  open,
  onOpenChange,
  onComplete,
}: QuickReviewModalProps) {
  const [paperUrl, setPaperUrl] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ paperUrl, notes });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick Paper Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Paper URL or DOI</Label>
            <Input
              id="url"
              value={paperUrl}
              onChange={(e) => setPaperUrl(e.target.value)}
              placeholder="Enter paper URL or DOI"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Review Focus (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What aspects of the paper would you like to focus on?"
              rows={3}
            />
          </div>
          <Button type="submit" className="w-full">
            Start Quick Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
