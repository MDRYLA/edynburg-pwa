"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "dark" | "light";
const KEY = "edinburgh_theme";

function applyTheme(theme: Theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    const saved: Theme = raw === "light" ? "light" : "dark";
    setTheme(saved);
    applyTheme(saved);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    applyTheme(next);
  };

  const Icon = theme === "dark" ? Sun : Moon;
  const label = theme === "dark" ? "Włącz tryb jasny" : "Włącz tryb ciemny";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="fixed top-3 right-3 z-50 w-10 h-10 rounded-full border border-border-subtle bg-bg-secondary/85 backdrop-blur-md text-fg-secondary hover:text-accent hover:border-accent flex items-center justify-center transition-colors"
      style={{
        top: "max(0.75rem, env(safe-area-inset-top))",
        right: "max(0.75rem, env(safe-area-inset-right))",
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
