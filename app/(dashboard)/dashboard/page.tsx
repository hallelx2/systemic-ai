import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardView } from "@/modules/dashboard/views/DashboardView";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = await auth.api.getSession({
    headers: cookieStore as any,
  });

  if (!session) {
    redirect("/login");
  }

  const projects: Array<{
    id: string;
    title: string;
    createdAt: Date;
    status: "in_progress" | "completed";
    paperCount: number;
  }> = [];

  return <DashboardView projects={projects} />;
}
