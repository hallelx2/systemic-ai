import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { RegisterView } from "@/modules/auth/views/RegisterView";

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const session = await auth.api.getSession({
    headers: cookieStore as any,
  });

  if (session) {
    redirect("/dashboard");
  }

  return <RegisterView />;
}
