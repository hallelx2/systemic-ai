import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginView } from "@/modules/auth/views/LoginView";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const session = await auth.api.getSession({
    headers: cookieStore as any,
  });

  if (session) {
    redirect("/dashboard");
  }

  return <LoginView />;
}
