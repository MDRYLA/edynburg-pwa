type Variant = "knot" | "thistle" | "cross" | "spiral";
type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const positionClasses: Record<Position, string> = {
  "top-left": "top-3 left-3",
  "top-right": "top-3 right-3",
  "bottom-left": "bottom-3 left-3",
  "bottom-right": "bottom-3 right-3",
};

export function Ornament({
  variant,
  position,
  size = 32,
  opacity = 0.18,
}: {
  variant: Variant;
  position: Position;
  size?: number;
  opacity?: number;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute ${positionClasses[position]} text-fg-faint`}
      style={{ opacity, width: size, height: size }}
    >
      <Paths variant={variant} size={size} />
    </span>
  );
}

function Paths({ variant, size }: { variant: Variant; size: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (variant) {
    case "knot":
      return (
        <svg {...common}>
          <path d="M8 16 Q8 8 16 8 Q24 8 24 16 Q24 24 16 24 Q8 24 8 16 Z" />
          <path d="M16 8 Q8 16 16 24 Q24 16 16 8" />
          <circle cx="16" cy="16" r="2" />
        </svg>
      );
    case "thistle":
      return (
        <svg {...common}>
          <path d="M16 4 L16 22" />
          <path d="M16 12 Q12 9 10 11 M16 12 Q20 9 22 11" />
          <path d="M16 16 Q11 14 9 17 M16 16 Q21 14 23 17" />
          <path d="M12 22 Q16 26 20 22" />
        </svg>
      );
    case "cross":
      return (
        <svg {...common}>
          <path d="M16 4 L16 28 M4 16 L28 16" />
          <circle cx="16" cy="16" r="5" />
        </svg>
      );
    case "spiral":
      return (
        <svg {...common}>
          <path d="M16 16 Q14 13 17 12 Q22 11 22 17 Q22 25 14 25 Q4 25 4 14 Q4 2 16 2" />
        </svg>
      );
  }
}
