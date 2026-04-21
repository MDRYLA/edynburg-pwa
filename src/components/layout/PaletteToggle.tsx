"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

type PaletteName = "swieca" | "atlas";
const KEY = "edinburgh_palette";

function applyPalette(p: PaletteName) {
  document.documentElement.setAttribute("data-palette", p);
}

export function PaletteToggle() {
  const [palette, setPalette] = useState<PaletteName>("swieca");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem(KEY) as PaletteName | null) ?? "swieca";
    setPalette(saved);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: PaletteName = palette === "swieca" ? "atlas" : "swieca";
    setPalette(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    applyPalette(next);
  };

  const label =
    palette === "swieca"
      ? "Zmień paletę na Atlas (niebieska)"
      : "Zmień paletę na Świeca (bursztyn)";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="fixed top-3 left-3 z-50 w-10 h-10 rounded-full border border-border-subtle bg-bg-secondary/85 backdrop-blur-md text-fg-secondary hover:text-accent hover:border-accent flex items-center justify-center transition-colors"
      style={{
        top: "max(0.75rem, env(safe-area-inset-top))",
        left: "max(0.75rem, env(safe-area-inset-left))",
      }}
      suppressHydrationWarning
    >
      {mounted ? (
        <Palette size={18} strokeWidth={1.75} aria-hidden />
      ) : (
        <span className="w-[18px] h-[18px]" aria-hidden />
      )}
    </button>
  );
}
