import { Navbar } from "@/components/layout/header";
import { Footer } from "@/components/home/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroDemo } from "../components/hero-demo";
import { BenefitsSection } from "../components/benefits-section";
import { SimpleHowItWorks } from "../components/simple-how-it-works";
import { Pricing } from "@/components/home/pricing";
import TestimonialCard from "@/components/home/TestimonialCard";
import { testimonials } from "@/data";

export function HomeView() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Analyze Research Papers in Seconds, Not Weeks
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              AI-powered research analysis that finds, reads, and synthesizes papers automatically. 
              Focus on insights, not endless literature reviews.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="ghost" size="lg">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BenefitsSection />
      
      <section id="demo" className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See It In Action
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Try our AI analysis with any PubMed paper — no signup required
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <HeroDemo />
          </div>
        </div>
      </section>

      <SimpleHowItWorks />
      <Pricing />

      <section className="py-20 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 neon-text">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                quote={testimonial.quote}
                name={testimonial.name}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 ">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 neon-text">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-foreground/80">
            Join SynthesisAI today and start making smarter, data-driven
            decisions for your research.
          </p>
          <Link href="/register" passHref>
            <Button className="cyberpunk-button px-6 py-3 rounded-full text-lg hover:bg-primary/80 transition duration-300">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 neon-text">
            Stay Updated
          </h2>
          <p className="text-center mb-8 text-foreground/80">
            Subscribe to our newsletter for the latest trends and insights.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter subscription"
                className="cyberpunk-input flex-grow px-4 py-2 rounded-l-md"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-r-md hover:bg-primary/80 transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
