import { Clock, Target, Zap, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Weeks of Work",
    description:
      "What takes weeks manually, AI completes in minutes. Spend time on insights, not paper hunting.",
  },
  {
    icon: Target,
    title: "Never Miss Key Research",
    description:
      "AI finds connections you'd never spot manually. Discover related papers across decades of research.",
  },
  {
    icon: Zap,
    title: "Instant Research Summaries",
    description:
      "Get the key findings from any paper in seconds. No more reading 50+ pages to find what matters.",
  },
  {
    icon: TrendingUp,
    title: "Publish Faster",
    description:
      "Generate publication-ready literature reviews automatically. From search to synthesis in one platform.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Why Researchers Love Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Get back to what matters: Your research
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  {benefit.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {benefit.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
