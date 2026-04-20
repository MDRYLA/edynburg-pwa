import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Divider } from "@/components/ui/Divider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { tips } from "@/data/tips";

export default function TipsPage() {
  return (
    <>
      <Header title="Porady" backHref="/" />
      <main className="max-w-[560px] mx-auto px-5 pt-6 with-bottom-nav fade-in">
        <section>
          <Eyebrow>Praktyczne info</Eyebrow>
          <h1 className="page-title mt-2">Porady</h1>
          <p className="italic-subtitle mt-2">Co warto wiedzieć przed wylotem.</p>
        </section>

        <Divider ornament="star" />

        <div className="space-y-8">
          {tips.map((group, idx) => (
            <section key={group.category}>
              <Eyebrow color={idx % 2 === 0 ? "muted" : "accent"}>
                {group.category}
              </Eyebrow>
              <ul className="mt-3 space-y-2">
                {group.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm text-fg-secondary leading-relaxed"
                  >
                    <span className="text-accent shrink-0 font-mono text-xs mt-1">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {idx < tips.length - 1 && (
                <div className="mt-8 h-px bg-border-subtle" aria-hidden />
              )}
            </section>
          ))}
        </div>

        <Divider ornament="cross" />

        <section className="text-center text-xs text-fg-muted">
          <p className="italic font-display">
            Safe travels. Dinnae forget your brolly.
          </p>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
