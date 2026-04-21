import Link from "next/link";
import { MapPin, UtensilsCrossed, Train, Info } from "lucide-react";
import { CurrentStatus } from "@/components/timeline/CurrentStatus";
import { Divider } from "@/components/ui/Divider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Ornament } from "@/components/layout/Ornament";

const quickLinks = [
  { href: "/places", icon: MapPin, label: "Miejsca", description: "6 atrakcji" },
  { href: "/food", icon: UtensilsCrossed, label: "Jedzenie", description: "3 opcje lunchu" },
  { href: "/transport", icon: Train, label: "Transport", description: "Tramwaj EDI" },
  { href: "/tips", icon: Info, label: "Porady", description: "Waluta, pogoda, język" },
];

export default function Home() {
  return (
    <main className="relative max-w-[560px] mx-auto px-5 pt-12 pb-12 fade-in">
      <Ornament variant="knot" position="top-left" size={36} opacity={0.14} />
      <Ornament variant="thistle" position="top-right" size={36} opacity={0.14} />

      <section className="text-center pt-6">
        <Eyebrow>One Day Guide</Eyebrow>
        <h1 className="hero-title mt-4">Edynburg</h1>
        <p className="italic-subtitle mt-3 max-w-xs mx-auto">
          Jeden dzień. Sześć miejsc. Jedna historia.
        </p>
      </section>

      <Divider ornament="star" />

      <section>
        <CurrentStatus />
      </section>

      <Divider ornament="thistle" />

      <section>
        <div className="mb-4">
          <Eyebrow>Szybki dostęp</Eyebrow>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map(({ href, icon: Icon, label, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-start gap-2 p-4 border border-border-subtle bg-bg-secondary rounded-lg hover:bg-accent hover:border-accent transition-colors min-h-[108px]"
            >
              <Icon
                size={22}
                strokeWidth={1.5}
                className="text-fg-muted group-hover:text-bg-primary transition-colors"
                aria-hidden
              />
              <div>
                <p className="font-display text-lg leading-tight group-hover:text-bg-primary transition-colors">
                  {label}
                </p>
                <p className="text-xs text-fg-muted group-hover:text-bg-primary/80 mt-0.5 transition-colors">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Divider ornament="cross" />

      <footer className="text-center text-xs text-fg-muted">
        <p className="font-mono tracking-wider">08:50 — 19:20</p>
        <p className="mt-1 italic font-display">
          <a
            href="https://mstudio.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Web design MSTUDIO
          </a>
        </p>
      </footer>
    </main>
  );
}
