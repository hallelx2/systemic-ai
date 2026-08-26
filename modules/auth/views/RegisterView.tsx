import { RegisterForm } from "../components/register-form";
import { AuthHeader } from "../components/auth-header";
import { AuthFooter } from "../components/auth-footer";

export function RegisterView() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80">
      <div className="w-full max-w-md space-y-6 p-8">
        <AuthHeader
          title="Create an account"
          description="Enter your details to get started"
        />
        <RegisterForm />
        <AuthFooter
          linkText="Already have an account? Sign in"
          linkHref="/login"
        />
      </div>
    </div>
  );
}
