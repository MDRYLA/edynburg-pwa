import { ExternalLink as ExtIcon } from "lucide-react";
import type { ReactNode } from "react";

export function ExternalLink({
  href,
  children,
  showIcon = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  showIcon?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-accent hover:text-accent-hover underline underline-offset-4 decoration-dotted inline-flex items-center gap-1 ${className}`}
    >
      <span>{children}</span>
      {showIcon ? <ExtIcon size={14} strokeWidth={1.75} aria-hidden /> : null}
    </a>
  );
}
