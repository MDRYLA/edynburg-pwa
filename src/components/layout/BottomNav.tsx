"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollText, MapPin, UtensilsCrossed, Train, Info } from "lucide-react";

const tabs = [
  { href: "/plan", icon: ScrollText, label: "Plan" },
  { href: "/places", icon: MapPin, label: "Miejsca" },
  { href: "/food", icon: UtensilsCrossed, label: "Jedzenie" },
  { href: "/transport", icon: Train, label: "Transport" },
  { href: "/tips", icon: Info, label: "Porady" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Nawigacja główna"
      className="fixed bottom-0 inset-x-0 z-40 bg-bg-secondary border-t border-border-subtle"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="max-w-[560px] mx-auto flex items-stretch h-16">
        {tabs.map(({ href, icon: Icon, label }) => {
          const active =
            pathname === href ||
            (href === "/places" && pathname?.startsWith("/places"));
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`h-full flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-eyebrow transition-colors ${
                  active ? "text-accent" : "text-fg-muted hover:text-fg-secondary"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={20} strokeWidth={1.5} aria-hidden />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
