import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  title?: string;
  backHref?: string;
  rightAction?: ReactNode;
}

export function Header({ title, backHref = "/", rightAction }: Props) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-bg-primary/85 border-b border-border-subtle">
      <div className="max-w-[560px] mx-auto h-14 flex items-center justify-between pl-16 pr-16">
        <Link
          href={backHref}
          className="flex items-center gap-1 text-fg-secondary hover:text-accent text-sm"
          aria-label="Wstecz"
        >
          <ChevronLeft size={18} strokeWidth={1.75} />
          <span className="uppercase tracking-wider">Wstecz</span>
        </Link>
        {title ? (
          <span className="text-xs uppercase tracking-eyebrow text-fg-muted truncate max-w-[50%]">
            {title}
          </span>
        ) : (
          <span />
        )}
        <div className="min-w-[48px] flex justify-end">{rightAction}</div>
      </div>
    </header>
  );
}
