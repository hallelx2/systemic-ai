"use client";

import { useState } from "react";
import { ChatHistory } from "@/components/chat/chat-history";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", content: message }]);

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

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4">
      <ChatHistory selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      <div className="flex-1 flex flex-col">
        <ChatMessages messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
