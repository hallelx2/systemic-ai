"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Brain } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading("Signing in...");

    try {
      const result = await signIn.email(
        {
          email,
          password,
        },
        {
          onRequest: () => {
            // Request is being sent
          },
          onSuccess: () => {
            toast.dismiss(loadingToast);
            toast.success("Welcome back!", {
              description: "You've been successfully signed in.",
              duration: 2000,
            });
            router.push('/dashboard');
            router.refresh();
          },
          onError: (ctx) => {
            toast.dismiss(loadingToast);
            toast.error("Login failed", {
              description: ctx.error.message || "Invalid email or password. Please try again.",
              duration: 4000,
            });
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="flex flex-col items-center space-y-2">
          <Brain className="h-12 w-12 text-primary" />
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <div className="text-center text-sm">
          <Link href="/register" className="text-primary hover:underline">
            Don&apos;t have an account? Sign up
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
