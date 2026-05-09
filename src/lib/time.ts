import { schedule } from "@/data/schedule";
import type { ScheduleEvent } from "@/types";

export const toMinutes = (t: string): number => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const nowMinutes = (now: Date = new Date()): number =>
  now.getHours() * 60 + now.getMinutes();

export function getCurrentEvent(now: Date = new Date()): ScheduleEvent | null {
  const current = nowMinutes(now);
  return (
    schedule.find(
      (e) => current >= toMinutes(e.timeStart) && current < toMinutes(e.timeEnd)
    ) ?? null
  );
}

export function getNextEvent(now: Date = new Date()): ScheduleEvent | null {
  const current = nowMinutes(now);
  return schedule.find((e) => toMinutes(e.timeStart) > current) ?? null;
}

export function minutesUntil(timeStr: string, now: Date = new Date()): number {
  return toMinutes(timeStr) - nowMinutes(now);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}min`;
}

export function isBeforeDay(now: Date = new Date()): boolean {
  return nowMinutes(now) < toMinutes(schedule[0].timeStart);
}

export function isAfterDay(now: Date = new Date()): boolean {
  const last = schedule[schedule.length - 1];
  return nowMinutes(now) >= toMinutes(last.timeEnd);
}

export function getProgress(visitedIds: string[]): { visited: number; total: number } {
  const attractions = schedule.filter((e) => e.type === "attraction");
  const visitedAttractions = attractions.filter((e) => visitedIds.includes(e.id));
  return { visited: visitedAttractions.length, total: attractions.length };
}
