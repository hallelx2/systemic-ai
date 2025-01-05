"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  // Add scroll event listener to track page scroll
  React.useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled more than 50px
      setScrolled(window.scrollY > 50);
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "w-full relative z-50 bg-white shadow bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "transition-all duration-300",
        scrolled
          ? "fixed top-0 z-50 border-b shadow-sm mx-auto left-0 right-0"
          : "relative z-50 bg-white shadow border-b",
      )}
    >
      <div
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          scrolled ? "max-w-5xl" : "max-w-7xl",
        )}
      >
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Brain className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold">SynthesisAI</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium",
                    pathname === item.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="default" size="sm">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button variant="outline" size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
