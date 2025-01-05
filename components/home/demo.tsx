"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, Send, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function Demo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Define newMessages as an array of Message
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
      {
        role: "assistant",
        content:
          "Here's a summary of the latest trends based on your query. [Demo response - In production, this would be real AI-generated content]",
      },
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Try SynthesisAI Demo
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ask about any research and get instant insights
          </p>
        </div>

        <Card className="mx-auto max-w-3xl">
          <div className="h-[400px] p-4 overflow-y-auto border-b">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Start by asking about research in any topic
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 mb-4 ${
                    message.role === "assistant"
                      ? "flex-row"
                      : "flex-row-reverse"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {message.role === "assistant" ? (
                      <Bot className="w-4 h-4 text-primary" />
                    ) : (
                      <User className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 bg-secondary/50 rounded-lg p-3">
                    {message.content}
                  </div>
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 flex gap-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about trends in any topic..."
              className="flex-1"
            />
            <Button type="submit">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
