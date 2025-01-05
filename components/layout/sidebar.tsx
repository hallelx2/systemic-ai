"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Brain,
  FileText,
  Settings,
  BookOpen,
  MessageSquare,
  BarChart,
  Menu,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Brain,
    href: "/dashboard",
  },
  {
    title: "Reviews",
    icon: BookOpen,
    href: "/dashboard/reviews",
  },
  {
    title: "Library",
    icon: FileText,
    href: "/dashboard/library",
  },
  {
    title: "Chat",
    icon: MessageSquare,
    href: "/dashboard/chat",
  },
  {
    title: "Analysis",
    icon: BarChart,
    href: "/dashboard/analysis",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    <div
      className={cn(
        "relative h-screen border-r bg-background transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/">
          <div className={cn("flex items-center gap-2", collapsed && "hidden")}>
            <Brain className="h-6 w-6" />
            <span className="font-semibold">SynthesisAI</span>
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("h-8 w-8", !collapsed && "hidden")}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent",
              collapsed && "justify-center",
            )}
          >
            <item.icon className="h-4 w-4" />
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout button section */}
      <div className="border-t p-2">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-destructive/10 text-destructive",
            collapsed && "justify-center",
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
