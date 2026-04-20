import { MapPin, Navigation } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./Button";
import { mapDirectionsUrl, mapPlaceUrl, mapSearchUrl, extractPlaceId } from "@/lib/maps";

interface Props {
  placeId?: string;
  query?: string;
  fullUrl?: string;
  directions?: boolean;
  variant?: "button" | "text";
  children?: ReactNode;
  fullWidth?: boolean;
}

export function MapLink({
  placeId,
  query,
  fullUrl,
  directions = false,
  variant = "button",
  children,
  fullWidth = true,
}: Props) {
  const id = placeId ?? (fullUrl ? extractPlaceId(fullUrl) : null);
  let url: string;
  if (id && directions) url = mapDirectionsUrl(id);
  else if (id) url = mapPlaceUrl(id);
  else if (query) url = mapSearchUrl(query);
  else if (fullUrl) url = fullUrl;
  else url = mapSearchUrl("Edinburgh");

  const label = children ?? (directions ? "Nawiguj do miejsca" : "Zobacz na mapie");

  if (variant === "text") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:text-accent-hover underline underline-offset-4 decoration-dotted inline-flex items-center gap-1"
      >
        <MapPin size={14} strokeWidth={1.75} aria-hidden />
        {label}
      </a>
    );
  }

  return (
    <Button
      href={url}
      external
      variant="primary"
      icon={directions ? Navigation : MapPin}
      fullWidth={fullWidth}
    >
      {label}
    </Button>
  );
}
