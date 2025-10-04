"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Brain } from "lucide-react";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        description: "Please choose a stronger password.",
      });
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Creating your account...");

    try {
      const result = await signUp.email(
        {
          email: form.email,
          password: form.password,
          name: form.name,
        },
        {
          onSuccess: () => {
            toast.dismiss(loadingToast);
            toast.success("Account created successfully!", {
              description: "You can now sign in with your credentials.",
              duration: 3000,
            });
            router.push("/login");
          },
          onError: (ctx) => {
            toast.dismiss(loadingToast);
            const errorMessage = ctx.error.message || "Failed to create account";
            
            if (errorMessage.toLowerCase().includes("email")) {
              toast.error("Email already exists", {
                description: "This email is already registered. Try signing in instead.",
                duration: 4000,
              });
            } else {
              toast.error("Registration failed", {
                description: errorMessage,
                duration: 4000,
              });
            }
            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong", {
        description: "An unexpected error occurred. Please try again.",
        duration: 4000,
      });
      setIsLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80">
      <div className="mx-auto w-full max-w-[400px] space-y-6 p-6">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to get started
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              type="text"
              disabled={isLoading}
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              disabled={isLoading}
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
        <div className="text-center text-sm">
          <Link href="/login" className="underline hover:text-primary">
            Already have an account? Sign In
          </Link>
        </div>
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
