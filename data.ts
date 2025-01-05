import { LucideIcon } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  quote: string;
  name: string;
}

export const features: Feature[] = [
  {
    title: "Real-time Insights",
    description:
      "Get instant summaries of trends and key topics from forums and communities.",
    icon: require("lucide-react").TrendingUp,
  },
  {
    title: "Conversational AI",
    description:
      "Chat with data to get actionable advice and detailed summaries.",
    icon: require("lucide-react").MessageSquare,
  },
  {
    title: "Predictive Analytics",
    description: "Identify emerging trends before they go mainstream.",
    icon: require("lucide-react").Zap,
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "TrendChat has revolutionized how we understand our our research topics. The insights are invaluable.",
    name: "Sarah J., Marketing Director",
  },
  {
    quote:
      "The AI-powered analysis saves us countless hours of manual research. It's a game-changer.",
    name: "Mike T., Product Manager",
  },
  {
    quote:
      "We've been able to stay ahead of trends and make data-driven decisions with confidence.",
    name: "Emily R., CEO",
  },
];
