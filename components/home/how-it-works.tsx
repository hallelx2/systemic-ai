"use client";

import { useState } from "react";
import {
  Search,
  Network,
  FileText,
  BarChart,
  Settings,
  Clipboard,
} from "lucide-react";

const steps = [
  {
    title: "Paper Retrieval",
    description:
      "Automatically fetch similar research papers from PubMed and other sources.",
    icon: Search, // Replace with an appropriate icon component
  },
  {
    title: "Knowledge Graph Construction",
    description:
      "Build an interactive knowledge graph from extracted paper data for seamless exploration.",
    icon: Network, // Replace with an appropriate icon component
  },
  {
    title: "Systematic Review Automation",
    description:
      "Generate comprehensive systematic reviews with inclusion/exclusion criteria and AI-driven analysis.",
    icon: FileText, // Replace with an appropriate icon component
  },
  {
    title: "Protocol Management",
    description:
      "Create, store, and manage systematic review protocols tailored to your requirements.",
    icon: Clipboard, // Replace with an appropriate icon component
  },
  {
    title: "Disparate Analysis",
    description:
      "Compare insights across multiple reviews and receive AI-suggested topics for follow-up research.",
    icon: BarChart, // Replace with an appropriate icon component
  },
  {
    title: "Personalization",
    description:
      "Set preferences and customize workflows for optimized systematic review outputs.",
    icon: Settings, // Replace with an appropriate icon component
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How SynthesisAI Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From data collection to actionable insights in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative"
              onMouseEnter={() => setActiveStep(index)}
            >
              <div
                className={`p-6 rounded-lg bg-background shadow-lg cursor-pointer transition-all duration-200 hover:scale-105
                  ${activeStep === index ? "border-2 border-primary" : "border border-border"}`}
              >
                <step.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
