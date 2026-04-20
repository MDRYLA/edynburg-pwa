"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Divider } from "@/components/ui/Divider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TimelineEvent } from "@/components/timeline/TimelineEvent";
import { ProgressBar } from "@/components/timeline/ProgressBar";
import { schedule } from "@/data/schedule";
import { getCurrentEvent, getProgress } from "@/lib/time";
import { getVisited, toggleVisited } from "@/lib/storage";

export default function PlanPage() {
  const [now, setNow] = useState<Date | null>(null);
  const [visitedIds, setVisitedIds] = useState<string[]>([]);

  useEffect(() => {
    setNow(new Date());
    setVisitedIds(getVisited());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const currentEvent = now ? getCurrentEvent(now) : null;
  const currentMinutes = now ? now.getHours() * 60 + now.getMinutes() : -1;
  const { visited, total } = getProgress(visitedIds);

  const handleToggle = (id: string) => {
    const next = toggleVisited(id);
    setVisitedIds(next);
  };

  return (
    <>
      <Header title="Plan dnia" backHref="/" />
      <main className="max-w-[560px] mx-auto px-5 pt-6 with-bottom-nav fade-in">
        <section>
          <Eyebrow>Timeline</Eyebrow>
          <h1 className="page-title mt-2">Plan dnia</h1>
          <p className="text-sm text-fg-muted font-mono mt-2">
            {schedule.length} wydarzeń · 08:50 – 19:20
          </p>
        </section>

        <div className="mt-6">
          <ProgressBar visited={visited} total={total} />
        </div>

        <Divider ornament="star" />

        <ol className="space-y-0 list-none p-0">
          {schedule.map((event, idx) => {
            const isLast = idx === schedule.length - 1;
            const toMin = (t: string) => {
              const [h, m] = t.split(":").map(Number);
              return h * 60 + m;
            };
            const isCurrent = currentEvent?.id === event.id;
            const isPast =
              currentMinutes >= 0 && toMin(event.timeEnd) <= currentMinutes;
            const isVisited = visitedIds.includes(event.id);
            return (
              <TimelineEvent
                key={event.id}
                event={event}
                isCurrent={isCurrent}
                isPast={isPast}
                isVisited={isVisited}
                onToggleVisited={handleToggle}
                isLast={isLast}
              />
            );
          })}
        </ol>

        <Divider ornament="cross" />
      </main>
      <BottomNav />
    </>
  );
}
