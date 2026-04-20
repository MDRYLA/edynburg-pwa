import { Check } from "lucide-react";

interface Props {
  visited: number;
  total: number;
}

export function ProgressBar({ visited, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((visited / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="font-mono text-xs text-fg-secondary tabular-nums whitespace-nowrap flex items-center gap-1">
        <span>{visited} z {total}</span>
        <Check size={12} strokeWidth={2} className="text-moss" aria-hidden />
      </div>
      <div
        className="flex-1 h-1.5 bg-bg-elevated border border-border-subtle rounded-sm overflow-hidden"
        role="progressbar"
        aria-valuenow={visited}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Zwiedzono ${visited} z ${total} atrakcji`}
      >
        <div
          className="h-full bg-moss transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
