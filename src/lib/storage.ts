const STORAGE_KEY = "edinburgh_visited";

export function getVisited(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function toggleVisited(eventId: string): string[] {
  const current = getVisited();
  const next = current.includes(eventId)
    ? current.filter((id) => id !== eventId)
    : [...current, eventId];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* quota / private mode — ignore */
  }
  return next;
}

export function isVisited(eventId: string): boolean {
  return getVisited().includes(eventId);
}

export function resetVisited(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
