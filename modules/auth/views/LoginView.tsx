import { LoginForm } from "../components/login-form";
import { AuthHeader } from "../components/auth-header";
import { AuthFooter } from "../components/auth-footer";

export function LoginView() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <AuthHeader
          title="Welcome back"
          description="Sign in to your account"
        />
        <LoginForm />
        <AuthFooter
          linkText="Don't have an account? Sign up"
          linkHref="/register"
        />
      </div>
    </div>
  );
}
