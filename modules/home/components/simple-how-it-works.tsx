import { FileSearch, Sparkles, FileText } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Start with Any Paper",
    description:
      "Paste a PubMed link, DOI, or research question. Our AI instantly understands your topic.",
    icon: FileSearch,
  },
  {
    number: "02",
    title: "AI Finds & Analyzes",
    description:
      "We search thousands of papers, extract key findings, and identify patterns you'd never spot manually.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Get Your Review",
    description:
      "Receive a publication-ready synthesis with citations, themes, and gaps in the research.",
    icon: FileText,
  },
];

export function SimpleHowItWorks() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From Paper to Review in 3 Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No complex setup. No manual screening. Just results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
