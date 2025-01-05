"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus } from "lucide-react";

interface ChatHistoryProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
}

export function ChatHistory({ selectedChat, onSelectChat }: ChatHistoryProps) {
  // Mock chat history data
  const chatHistory = [
    { id: "1", title: "Research on AI in Healthcare" },
    { id: "2", title: "Machine Learning Applications" },
    { id: "3", title: "Neural Networks Study" },
  ];

  return (
    <div className="w-64 border-r">
      <div className="p-4 border-b">
        <Button className="w-full" onClick={() => onSelectChat("new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-2 space-y-2">
          {chatHistory.map((chat) => (
            <Button
              key={chat.id}
              variant={selectedChat === chat.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSelectChat(chat.id)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              <span className="truncate">{chat.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
