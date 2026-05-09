import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode, MouseEventHandler } from "react";

type Variant = "primary" | "secondary" | "link";
type Size = "sm" | "md" | "lg";

interface Props {
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  iconRight?: LucideIcon;
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-bg-primary hover:bg-accent-hover hover:text-fg-primary active:brightness-95 border border-accent",
  secondary:
    "bg-transparent text-fg-primary border border-border-medium hover:bg-accent hover:border-accent hover:text-bg-primary",
  link: "bg-transparent text-accent hover:text-accent-hover underline underline-offset-4 decoration-dotted px-0 py-0 border-0",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs tracking-wider",
  md: "px-4 py-2.5 text-sm tracking-wider",
  lg: "px-5 py-3.5 text-sm tracking-wider",
};

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconRight: IconRight,
  fullWidth,
  href,
  external,
  disabled,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
  children,
}: Props) {
  const className = [
    "inline-flex items-center justify-center gap-2",
    "font-body font-medium uppercase",
    "rounded-md transition-colors duration-150",
    variant !== "link" ? sizeClasses[size] : "",
    variantClasses[variant],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 pointer-events-none" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {Icon ? <Icon size={16} strokeWidth={1.75} aria-hidden /> : null}
      <span>{children}</span>
      {IconRight ? <IconRight size={16} strokeWidth={1.75} aria-hidden /> : null}
    </>
  );

  if (href) {
    const isExternal = external || href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
