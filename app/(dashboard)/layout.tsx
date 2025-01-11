"use client"

import { Sidebar } from "@/components/layout/sidebar";
import { supabase } from "@/lib/supabase/supabaseClient";
import {useRouter} from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const router = useRouter()

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
