"use client";

import { useState } from "react";
import { ChatHistory } from "@/components/chat/chat-history";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4">
      <ChatHistory selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      <div className="flex-1 flex flex-col">
        <ChatMessages chatId={selectedChat} />
        <ChatInput chatId={selectedChat} />
      </div>
    </div>
  );
}
