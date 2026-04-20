import { AlertTriangle, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Divider } from "@/components/ui/Divider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { transportToCity, transportToAirport, networkDayTicket } from "@/data/transport";

export default function TransportPage() {
  return (
    <>
      <Header title="Transport" backHref="/" />
      <main className="max-w-[560px] mx-auto px-5 pt-6 with-bottom-nav fade-in">
        <section>
          <Eyebrow>Edinburgh Tram</Eyebrow>
          <h1 className="page-title mt-2">Transport</h1>
          <p className="italic-subtitle mt-2">Lotnisko ↔ centrum.</p>
        </section>

        <Divider ornament="star" />

        <section className="border border-border-subtle bg-bg-secondary rounded-lg p-5">
          <Eyebrow color="accent">Z lotniska (rano)</Eyebrow>
          <p className="font-display text-2xl mt-2 leading-tight">{transportToCity.name}</p>
          <p className="text-sm text-fg-muted font-mono mt-2">
            {transportToCity.duration} · {transportToCity.price} · {transportToCity.frequency}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-fg-secondary">
            {transportToCity.pros.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent shrink-0">✦</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <Divider ornament="thistle" />

        <section className="border border-border-subtle bg-bg-secondary rounded-lg p-5">
          <Eyebrow color="accent">Z powrotem (wieczorem)</Eyebrow>
          <p className="font-display text-2xl mt-2 leading-tight">{transportToAirport.name}</p>
          <p className="text-sm text-fg-muted font-mono mt-2">
            {transportToAirport.duration} · {transportToAirport.price} · {transportToAirport.frequency}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-fg-secondary">
            {transportToAirport.pros.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent shrink-0">✦</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          {transportToAirport.cons && transportToAirport.cons.length > 0 && (
            <p className="text-xs text-fg-muted mt-3 italic">
              Uwaga: {transportToAirport.cons[0]}
            </p>
          )}
        </section>

        <Divider ornament="star" />

        <section>
          <Eyebrow>Jak kupić bilet</Eyebrow>
          <div className="mt-4 space-y-3">
            {transportToCity.buyOptions.map((opt, i) => (
              <article
                key={i}
                className="border border-border-subtle bg-bg-secondary rounded-lg p-4"
              >
                <p className="font-display text-lg leading-tight">{opt.method}</p>
                {opt.note && (
                  <p className="text-sm text-fg-secondary mt-2 leading-relaxed">
                    {opt.note}
                  </p>
                )}
                {opt.url && (
                  <div className="mt-3">
                    <Button
                      href={opt.url}
                      external
                      variant="secondary"
                      size="sm"
                      iconRight={ArrowRight}
                    >
                      Otwórz
                    </Button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <Divider ornament="cross" />

        <section className="border border-accent bg-bg-elevated rounded-lg p-5">
          <Eyebrow color="accent">Oszczędność</Eyebrow>
          <p className="font-display text-2xl mt-2 leading-tight">
            {networkDayTicket.name}
          </p>
          <p className="text-sm text-fg-muted font-mono mt-2">
            {networkDayTicket.price} · {networkDayTicket.savings}
          </p>
          <p className="text-sm text-fg-secondary mt-3 leading-relaxed">
            {networkDayTicket.validity}. {networkDayTicket.note}
          </p>
          <div className="mt-4">
            <Button
              href={networkDayTicket.buyUrl}
              external
              variant="primary"
              size="md"
              iconRight={ArrowRight}
              fullWidth
            >
              Kup online
            </Button>
          </div>
        </section>

        <Divider ornament="thistle" />

        <section className="border border-rust bg-bg-secondary rounded-lg p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={18}
              strokeWidth={1.75}
              className="shrink-0 text-rust mt-0.5"
              aria-hidden
            />
            <div>
              <Eyebrow color="rust">Pamiętaj</Eyebrow>
              <p className="text-sm text-fg-secondary mt-2 leading-relaxed">
                Zwykłe bilety miejskie (£2.40) <strong>nie działają</strong> na trasie do
                lotniska. Potrzebujecie Airport Single (£7.50) albo Network DAYticket
                (£12.50).
              </p>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
