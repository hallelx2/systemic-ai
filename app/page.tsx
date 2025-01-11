import { Demo } from "@/components/home/demo";
import { Footer } from "@/components/home/footer";
import { HowItWorks } from "@/components/home/how-it-works";
import { Pricing } from "@/components/home/pricing";
import TestimonialCard from "@/components/home/TestimonialCard";
import { Navbar } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data";

import { Brain, BookOpen, Search, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Transform Your Research with AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Automate systematic reviews using advanced AI. From paper analysis
              to comprehensive reports, streamline your research workflow with
              intelligent automation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Accelerate Research
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need for systematic reviews
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  AI-Powered Analysis
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Leverage advanced AI to analyze papers, extract key
                  information, and build comprehensive knowledge graphs.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  Smart Paper Discovery
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Start with a single paper and discover related research
                  through intelligent search and recommendations.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  Automated Reviews
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Generate comprehensive systematic reviews with automated
                  screening, data extraction, and synthesis.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  Smart Reports
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  Create detailed reports and protocols with AI assistance,
                  perfect for publication and review.
                </dd>
              </div>
            </dl>
          </div>
          <HowItWorks />
          <Demo />
          <Pricing />

          {/* Testimonials Section */}
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

          {/* CTA Section */}
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

          {/* Newsletter Signup */}
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
