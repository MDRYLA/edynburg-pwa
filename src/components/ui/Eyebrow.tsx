import type { ReactNode } from "react";

type Color = "muted" | "accent" | "moss" | "rust";

const colorClasses: Record<Color, string> = {
  muted: "text-fg-muted",
  accent: "text-accent",
  moss: "text-moss",
  rust: "text-rust",
};

export function Eyebrow({
  children,
  color = "muted",
  className = "",
}: {
  children: ReactNode;
  color?: Color;
  className?: string;
}) {
  return (
    <span
      className={`font-body text-[11px] font-medium uppercase tracking-eyebrow ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
}
