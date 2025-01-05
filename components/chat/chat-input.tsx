"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { Input } from "../ui/input";

interface ChatInputProps {
  chatId: string | null;
}

export function ChatInput({ chatId }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !chatId) return;

    // TODO: Implement message sending
    setMessage("");
  };

  if (!chatId) return null;

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about trends in any topic..."
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button type="submit" size="icon" disabled={!message.trim()}>
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
