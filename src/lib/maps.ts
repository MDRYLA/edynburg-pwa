export function mapPlaceUrl(placeId: string): string {
  return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}

export function mapDirectionsUrl(placeId: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination_place_id=${placeId}&travelmode=walking`;
}

export function mapSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function extractPlaceId(googleMapsUrl: string): string | null {
  const match = googleMapsUrl.match(/place_id:([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}
