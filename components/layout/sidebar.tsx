"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Brain,
  Settings,
  BookOpen,
  BarChart,
  Menu,
  LogOut,
  Pin,
  PinOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "@/lib/auth-client";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Brain,
    href: "/dashboard",
  },
  {
    title: "Research Tools",
    icon: BookOpen,
    href: "/dashboard/research",
  },
  {
    title: "Reviews",
    icon: BookOpen,
    href: "/dashboard/reviews",
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
  const [isPinned, setIsPinned] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Load pinned state from localStorage on mount
  useEffect(() => {
    const savedPinState = localStorage.getItem("sidebar-pinned");
    if (savedPinState === "true") {
      setIsPinned(true);
      setCollapsed(false);
    }
  }, []);

  // Save pinned state to localStorage
  const togglePin = () => {
    const newPinnedState = !isPinned;
    setIsPinned(newPinnedState);
    localStorage.setItem("sidebar-pinned", String(newPinnedState));
    
    if (newPinnedState) {
      setCollapsed(false);
      toast.success("Sidebar locked", {
        description: "Sidebar will stay expanded",
      });
    } else {
      toast.info("Sidebar unlocked", {
        description: "Sidebar will auto-collapse on mouse leave",
      });
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    const loadingToast = toast.loading("Signing out...");

    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.dismiss(loadingToast);
            toast.success("Signed out successfully", {
              description: "You've been logged out. See you next time!",
              duration: 2000,
            });
            setTimeout(() => {
              router.push("/login");
              router.refresh();
            }, 500);
          },
          onError: () => {
            toast.dismiss(loadingToast);
            toast.error("Logout failed", {
              description: "Something went wrong. Please try again.",
              duration: 3000,
            });
            setIsLoading(false);
          },
        },
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Something went wrong", {
        description: "Unable to sign out. Please try again.",
        duration: 3000,
      });
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "relative h-screen border-r bg-background transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64",
        )}
        onMouseEnter={() => !isPinned && setCollapsed(false)}
        onMouseLeave={() => !isPinned && setCollapsed(true)}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/">
            <div className={cn("flex items-center gap-2", collapsed && "hidden")}>
              <Brain className="h-6 w-6" />
              <span className="font-semibold">SynthesisAI</span>
            </div>
          </Link>
          <div className="flex items-center gap-1">
            {!collapsed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePin}
                    className="h-8 w-8"
                  >
                    {isPinned ? (
                      <Pin className="h-4 w-4 text-primary" />
                    ) : (
                      <PinOff className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{isPinned ? "Unlock sidebar" : "Lock sidebar expanded"}</p>
                </TooltipContent>
              </Tooltip>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className={cn("h-8 w-8", !collapsed && "hidden")}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-2">
          {sidebarItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
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
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  <p>{item.title}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>

        {/* Logout button section */}
        <div className="border-t p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-destructive/10 text-destructive disabled:opacity-50 disabled:cursor-not-allowed",
                  collapsed && "justify-center",
                )}
              >
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>{isLoading ? "Signing out..." : "Logout"}</span>}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
