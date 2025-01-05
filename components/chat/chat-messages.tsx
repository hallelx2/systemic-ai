"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain } from "lucide-react";

interface ChatMessagesProps {
  chatId: string | null;
}

export function ChatMessages({ chatId }: ChatMessagesProps) {
  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <Brain className="h-8 w-8" />
          <p>Select a chat or start a new conversation</p>
        </div>
      </div>
    );
  }

  // Mock messages data
  const messages = [
    { id: 1, role: "user", content: "Can you analyze the results?" },
    {
      id: 2,
      role: "assistant",
      content:
        "Based on the research results, I can identify several key patterns...",
    },
  ];

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
