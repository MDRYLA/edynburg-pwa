import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Divider } from "@/components/ui/Divider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlaceHero } from "@/components/places/PlaceHero";
import { PlaceSection } from "@/components/places/PlaceSection";
import { MapLink } from "@/components/ui/MapLink";
import { places, placesList } from "@/data/places";
import { schedule } from "@/data/schedule";

export function generateStaticParams() {
  return placesList.map((p) => ({ slug: p.slug }));
}

export default function PlacePage({ params }: { params: { slug: string } }) {
  const place = places[params.slug];
  if (!place) notFound();

  const scheduleIdx = schedule.findIndex(
    (e) => e.type === "attraction" && e.placeId === place.slug
  );
  const nextAttractionIdx = schedule.findIndex(
    (e, i) => i > scheduleIdx && e.type === "attraction"
  );
  const nextPlace =
    nextAttractionIdx > -1 && schedule[nextAttractionIdx].placeId
      ? places[schedule[nextAttractionIdx].placeId!]
      : null;

  return (
    <>
      <Header
        title={place.name}
        backHref="/places"
        rightAction={
          <MapLink fullUrl={place.googleMapsUrl} variant="text">
            Mapa
          </MapLink>
        }
      />
      <main className="max-w-[560px] mx-auto px-5 pt-4 with-bottom-nav fade-in">
        <PlaceHero place={place} />

        <Divider ornament="thistle" />

        {place.sections.length > 0 ? (
          <section>
            <Eyebrow>Historia</Eyebrow>
            <div className="mt-4">
              {place.sections.map((s, i) => (
                <PlaceSection key={i} title={s.title} content={s.content} index={i} />
              ))}
            </div>
          </section>
        ) : (
          <section className="border border-border-subtle bg-bg-secondary rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Info size={18} strokeWidth={1.5} className="shrink-0 text-fg-muted mt-0.5" aria-hidden />
              <div>
                <Eyebrow>Treść wkrótce</Eyebrow>
                <p className="text-sm text-fg-secondary mt-2 leading-relaxed">
                  Sekcje historyczne zostaną uzupełnione po Deep Research. Plik:{" "}
                  <code className="font-mono text-xs text-fg-primary">
                    src/data/places.ts
                  </code>{" "}
                  — pole <code className="font-mono text-xs text-fg-primary">sections</code>.
                </p>
              </div>
            </div>
          </section>
        )}

        {place.tips.length > 0 && (
          <>
            <Divider ornament="star" />
            <section>
              <Eyebrow>Warto wiedzieć</Eyebrow>
              <ul className="mt-4 space-y-3">
                {place.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-sm text-fg-secondary leading-relaxed">
                    <span className="text-accent shrink-0 font-mono text-xs mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {nextPlace && (
          <>
            <Divider ornament="cross" />
            <section>
              <Eyebrow>Następne w planie</Eyebrow>
              <Link
                href={`/places/${nextPlace.slug}`}
                className="group mt-3 flex items-center justify-between gap-3 border border-border-subtle bg-bg-secondary rounded-lg p-4 hover:bg-accent hover:border-accent transition-colors"
              >
                <div>
                  <p className="font-display text-xl leading-tight group-hover:text-bg-primary transition-colors">
                    {nextPlace.name}
                  </p>
                  <p className="text-xs text-fg-muted group-hover:text-bg-primary/80 mt-1 font-mono transition-colors">
                    {nextPlace.duration}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  strokeWidth={1.75}
                  className="shrink-0 text-fg-muted group-hover:text-bg-primary transition-colors"
                  aria-hidden
                />
              </Link>
            </section>
          </>
        )}
      </main>
      <BottomNav />
    </>
  );
}
