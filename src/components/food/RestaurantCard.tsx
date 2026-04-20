import { Clock, Coins, Star } from "lucide-react";
import type { Restaurant } from "@/types";
import { MapLink } from "@/components/ui/MapLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface Props {
  restaurant: Restaurant;
  recommended?: boolean;
}

const typeLabel: Record<Restaurant["type"], string> = {
  "street-food": "Street food",
  "sit-down": "Na miejscu",
  cafe: "Kawiarnia",
};

export function RestaurantCard({ restaurant, recommended }: Props) {
  return (
    <article
      className={`border rounded-lg p-5 ${
        recommended ? "bg-bg-elevated border-accent" : "bg-bg-secondary border-border-subtle"
      }`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <Eyebrow color="muted">{typeLabel[restaurant.type]}</Eyebrow>
        {recommended && (
          <span className="inline-flex items-center gap-1 text-xs uppercase tracking-eyebrow text-accent">
            <Star size={12} strokeWidth={1.75} aria-hidden />
            Rekomendacja
          </span>
        )}
      </div>
      <h3 className="font-display text-2xl leading-tight mt-2">{restaurant.name}</h3>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-fg-muted font-mono">
        <span className="inline-flex items-center gap-1">
          <Coins size={12} strokeWidth={1.75} aria-hidden />
          {restaurant.price} · {restaurant.priceRange}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} strokeWidth={1.75} aria-hidden />
          {restaurant.speed}
        </span>
      </div>
      <p className="text-sm text-fg-secondary mt-3 leading-relaxed">{restaurant.description}</p>
      <div className="mt-4 pt-4 border-t border-border-subtle">
        <p className="text-xs uppercase tracking-eyebrow text-fg-muted">
          Co zamówić
        </p>
        <p className="text-sm text-fg-primary mt-1">{restaurant.recommendation}</p>
        <p className="text-xs text-fg-muted mt-1">Specjalność: {restaurant.specialty}</p>
      </div>
      <p className="text-xs text-fg-muted mt-4 font-mono">{restaurant.address}</p>
      <div className="mt-4">
        <MapLink fullUrl={restaurant.googleMapsUrl} directions={recommended}>
          {recommended ? "Nawiguj tam" : "Zobacz na mapie"}
        </MapLink>
      </div>
    </article>
  );
}
