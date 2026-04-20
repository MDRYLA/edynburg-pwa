import type { ReactNode, ElementType } from "react";

type Variant = "default" | "elevated" | "active" | "warning";

interface Props {
  variant?: Variant;
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  default: "bg-bg-secondary border-border-subtle",
  elevated: "bg-bg-elevated border-border-medium",
  active: "bg-bg-elevated border-accent",
  warning: "bg-bg-secondary border-rust",
};

export function Card({ variant = "default", as: Tag = "div", children, className = "" }: Props) {
  return (
    <Tag
      className={`border rounded-lg p-5 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Tag>
  );
}
