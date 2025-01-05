import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const tiers = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started with Research",
    features: [
      "Basic Information Retrieval",
      "Augmented generation",
      "Community access",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "49",
    description: "Advanced features for serious trend analysts",
    features: [
      "Everything in Free",
      "Advanced analytics",
      "More Database Access",
      "Conversational insights",
      "Custom alerts",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom solutions for large organizations",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "API access",
      "Dedicated support",
      "Custom training",
      "SLA guarantee",
    ],
  },
];

export function Pricing() {
  return (
    <section className="py-24 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card key={tier.name} className="p-8">
              <h3 className="text-2xl font-bold">{tier.name}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold">${tier.price}</span>
                {tier.price !== "Custom" && (
                  <span className="ml-2">/month</span>
                )}
              </div>
              <p className="mt-4 text-muted-foreground">{tier.description}</p>
              <ul className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full">Get Started</Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
