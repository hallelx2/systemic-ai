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

interface ImportPapersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: any) => void;
}

export function ImportPapersModal({
  open,
  onOpenChange,
  onComplete,
}: ImportPapersModalProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ files, description });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Research Papers</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="files">Upload Papers (PDF)</Label>
            <Input
              id="files"
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">
              Collection Description (Optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this collection of papers"
              rows={3}
            />
          </div>
          <Button type="submit" className="w-full">
            Import Papers
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
