import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthFooterProps {
  linkText: string;
  linkHref: string;
  showBackButton?: boolean;
}

export function AuthFooter({ linkText, linkHref, showBackButton = true }: AuthFooterProps) {
  return (
    <>
      <div className="text-center text-sm">
        <Link href={linkHref} className="text-primary hover:underline">
          {linkText}
        </Link>
      </div>
      {showBackButton && (
        <div className="mt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>
      )}
    </>
  );
}
