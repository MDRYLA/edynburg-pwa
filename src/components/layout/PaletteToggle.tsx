"use client";

import { useEffect, useState } from "react";
import { Flame, Compass, Droplet } from "lucide-react";

type PaletteName = "swieca" | "atlas" | "krew";
const KEY = "edinburgh_palette";
const ORDER: PaletteName[] = ["swieca", "atlas", "krew"];

const META: Record<PaletteName, { Icon: typeof Flame; label: string; next: string }> = {
  swieca: { Icon: Flame, label: "Paleta: Świeca (bursztyn)", next: "Atlas (niebieski)" },
  atlas: { Icon: Compass, label: "Paleta: Atlas (niebieski)", next: "Krew (czerwony)" },
  krew: { Icon: Droplet, label: "Paleta: Krew (czerwony)", next: "Świeca (bursztyn)" },
};

function applyPalette(p: PaletteName) {
  document.documentElement.setAttribute("data-palette", p);
}

export function PaletteToggle() {
  const [palette, setPalette] = useState<PaletteName>("swieca");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as PaletteName | null;
    const valid = saved && ORDER.includes(saved) ? saved : "swieca";
    setPalette(valid);
    setMounted(true);
  }, []);

  const toggle = () => {
    const idx = ORDER.indexOf(palette);
    const next = ORDER[(idx + 1) % ORDER.length];
    setPalette(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    applyPalette(next);
  };

  const { Icon, label, next } = META[palette];
  const title = `${label} — kliknij: ${next}`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={title}
      title={title}
      className="fixed top-3 left-3 z-50 w-10 h-10 rounded-full border border-border-subtle bg-bg-secondary/85 backdrop-blur-md text-fg-secondary hover:bg-accent hover:text-bg-primary hover:border-accent flex items-center justify-center transition-colors"
      style={{
        top: "max(0.75rem, env(safe-area-inset-top))",
        left: "max(0.75rem, env(safe-area-inset-left))",
      }}
      suppressHydrationWarning
    >
      {mounted ? (
        <Icon size={18} strokeWidth={1.75} aria-hidden />
      ) : (
        <span className="w-[18px] h-[18px]" aria-hidden />
      )}
    </button>
  );
}
