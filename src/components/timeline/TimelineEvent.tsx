"use client";

import Link from "next/link";
import { Check, Utensils, Footprints, Ticket } from "lucide-react";
import type { ScheduleEvent } from "@/types";
import { MapLink } from "@/components/ui/MapLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { places } from "@/data/places";

interface Props {
  event: ScheduleEvent;
  isCurrent: boolean;
  isPast: boolean;
  isVisited: boolean;
  onToggleVisited: (id: string) => void;
  isLast?: boolean;
}

export function TimelineEvent({
  event,
  isCurrent,
  isPast,
  isVisited,
  onToggleVisited,
  isLast,
}: Props) {
  if (event.type === "transit") {
    return (
      <li className="relative flex gap-4 pl-1">
        <div className="flex flex-col items-center w-6 shrink-0">
          <span className="w-2 h-2 rounded-full border border-border-medium bg-bg-primary mt-4" aria-hidden />
          {!isLast && <span className="flex-1 w-px bg-border-subtle my-1" aria-hidden />}
        </div>
        <div className="flex-1 py-3">
          <div className="flex items-baseline gap-2 text-fg-muted text-xs tracking-wider">
            <Footprints size={12} strokeWidth={1.75} aria-hidden />
            <time>{event.timeStart}–{event.timeEnd}</time>
            <span>·</span>
            <span>{event.duration} min</span>
          </div>
          <p className="text-sm text-fg-secondary mt-1">{event.title}</p>
          {event.notes && (
            <p className="text-xs text-fg-muted mt-1 italic">{event.notes}</p>
          )}
          {event.stopUrl && (
            <div className="mt-2 text-xs">
              <MapLink fullUrl={event.stopUrl} variant="text">
                {event.stopName ?? "Mapa przystanku"}
              </MapLink>
            </div>
          )}
        </div>
      </li>
    );
  }

  const place = event.placeId ? places[event.placeId] : null;
  const dotClass = isCurrent
    ? "bg-accent border-accent"
    : isPast && isVisited
      ? "bg-moss border-moss text-bg-primary"
      : isPast
        ? "bg-border-medium border-border-medium"
        : "bg-bg-primary border-border-medium";
  const cardClass = isCurrent
    ? "bg-bg-elevated border-accent"
    : isPast
      ? "bg-bg-secondary border-border-subtle opacity-70"
      : "bg-bg-secondary border-border-subtle";

  return (
    <li className="relative flex gap-4 pl-1">
      <div className="flex flex-col items-center w-6 shrink-0">
        <span
          className={`w-4 h-4 rounded-full border-2 mt-5 flex items-center justify-center ${dotClass}`}
          aria-hidden
        >
          {isPast && isVisited && <Check size={10} strokeWidth={2.5} />}
        </span>
        {!isLast && <span className="flex-1 w-px bg-border-subtle my-1" aria-hidden />}
      </div>
      <article className={`flex-1 border rounded-lg p-4 my-2 ${cardClass}`}>
        <div className="flex items-baseline justify-between gap-2 flex-wrap">
          <time className="text-xs tracking-wider text-fg-muted font-mono">
            {event.timeStart}–{event.timeEnd}
          </time>
          {isCurrent && (
            <Eyebrow color="accent">Teraz</Eyebrow>
          )}
          {isPast && isVisited && (
            <Eyebrow color="moss">Zwiedzone</Eyebrow>
          )}
          {event.ticketRequired && !isPast && (
            <span className="inline-flex items-center gap-1 text-xs text-rust">
              <Ticket size={12} strokeWidth={1.75} aria-hidden />
              Bilet
            </span>
          )}
        </div>
        <h3 className="font-display text-xl leading-tight mt-1">
          {event.type === "meal" && (
            <Utensils size={16} strokeWidth={1.5} className="inline-block mr-2 text-fg-muted" aria-hidden />
          )}
          {event.title}
        </h3>
        {event.subtitle && (
          <p className="text-sm text-fg-secondary italic mt-1">{event.subtitle}</p>
        )}
        <p className="text-xs text-fg-muted mt-2 font-mono">
          {event.duration} min{event.price ? ` · ${event.price}` : ""}
          {event.bufferMinutes ? ` · bufor ${event.bufferMinutes} min` : ""}
        </p>
        {event.notes && (
          <p className="text-xs text-fg-muted mt-2">{event.notes}</p>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {event.type === "attraction" && place && (
            <Link
              href={`/places/${place.slug}`}
              className="text-xs uppercase tracking-wider text-accent border border-border-medium rounded-md px-3 py-1.5 transition-colors hover:bg-accent hover:border-accent hover:text-bg-primary"
            >
              Szczegóły →
            </Link>
          )}
          {event.type === "meal" && (
            <Link
              href="/food"
              className="text-xs uppercase tracking-wider text-accent border border-border-medium rounded-md px-3 py-1.5 transition-colors hover:bg-accent hover:border-accent hover:text-bg-primary"
            >
              Zobacz opcje →
            </Link>
          )}
          {place && (
            <MapLink
              fullUrl={place.googleMapsUrl}
              variant="text"
            >
              Mapa
            </MapLink>
          )}
        </div>

        {event.type === "attraction" && (
          <label className="flex items-center gap-2 mt-3 pt-3 border-t border-border-subtle cursor-pointer text-xs text-fg-secondary select-none">
            <input
              type="checkbox"
              checked={isVisited}
              onChange={() => onToggleVisited(event.id)}
              className="w-4 h-4 accent-moss"
            />
            <span>Zwiedzone</span>
          </label>
        )}
      </article>
    </li>
  );
}
