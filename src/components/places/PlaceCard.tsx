import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Place } from "@/types";
import { PlaceIllustration } from "./PlaceIllustration";

interface Props {
  place: Place;
}

export function PlaceCard({ place }: Props) {
  return (
    <Link
      href={`/places/${place.slug}`}
      className="group flex items-center gap-4 p-4 border rounded-lg transition-colors bg-bg-secondary border-border-subtle hover:bg-accent hover:border-accent"
    >
      <div className="w-20 h-20 shrink-0 flex items-center justify-center bg-bg-elevated rounded-md border border-border-subtle">
        <PlaceIllustration slug={place.slug} size={64} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="eyebrow text-fg-muted group-hover:text-bg-primary/80 truncate transition-colors">
          {place.nameEn}
        </p>
        <h3 className="font-display text-xl leading-tight mt-1 text-fg-primary group-hover:text-bg-primary transition-colors">
          {place.name}
        </h3>
        <p className="text-xs text-fg-muted group-hover:text-bg-primary/80 font-mono mt-1 transition-colors">
          {place.duration}
          {place.price ? ` · ${place.price}` : ""}
        </p>
      </div>
      <ArrowRight
        size={16}
        strokeWidth={1.75}
        className="shrink-0 text-fg-muted group-hover:text-bg-primary transition-colors"
        aria-hidden
      />
    </Link>
  );
}
