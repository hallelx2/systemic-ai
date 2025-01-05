"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Construction, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center px-4">
        <Construction className="mx-auto mb-8 w-24 h-24 text-gray-400" />
        <h1 className="text-5xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-2xl mb-8">This feature is not yet available</p>
        <Button
          onClick={() => router.back()}
          className="bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-300 font-semibold py-3 px-6 rounded-lg flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Go Back
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-sm opacity-75">
        © 2025 SynthesisAI. All rights reserved.
      </div>
    </div>
  );
}
