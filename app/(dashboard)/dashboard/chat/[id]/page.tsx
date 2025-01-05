"use client";

import { useState } from "react";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<any[]>([]);

  const handleSendMessage = async (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    // TODO: Implement AI response
    // Mock AI response for now
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I understand your question. Let me analyze that for you...",
        },
      ]);
    }, 1000);
  };

  if (!params.id) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <Brain className="h-12 w-12 text-primary mx-auto" />
            <CardTitle>Start a New Chat</CardTitle>
            <p className="text-muted-foreground">
              Select a research project or start a new conversation
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
