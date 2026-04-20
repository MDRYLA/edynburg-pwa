import type { Place } from "@/types";
import { Clock, Coins, Timer } from "lucide-react";
import { PlaceIllustration } from "./PlaceIllustration";
import { MapLink } from "@/components/ui/MapLink";

export function PlaceHero({ place }: { place: Place }) {
  return (
    <section className="relative text-center py-6">
      <div className="flex justify-center mb-4">
        <PlaceIllustration slug={place.slug} size={200} />
      </div>
      <p className="eyebrow text-fg-muted">{place.nameEn}</p>
      <h1 className="font-display text-4xl md:text-5xl leading-tight mt-2">
        {place.name}
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-5 text-xs text-fg-muted font-mono">
        {place.openingHours && (
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} strokeWidth={1.75} aria-hidden />
            {place.openingHours}
          </span>
        )}
        {place.price && (
          <span className="inline-flex items-center gap-1.5">
            <Coins size={12} strokeWidth={1.75} aria-hidden />
            {place.price}
          </span>
        )}
        {place.duration && (
          <span className="inline-flex items-center gap-1.5">
            <Timer size={12} strokeWidth={1.75} aria-hidden />
            {place.duration}
          </span>
        )}
      </div>
      <div className="mt-6 max-w-xs mx-auto">
        <MapLink
          fullUrl={place.googleMapsUrl}
          destinationName={place.nameEn}
          directions
        >
          Nawiguj do miejsca
        </MapLink>
      </div>
    </section>
  );
}
