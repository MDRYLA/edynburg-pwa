"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  getCurrentEvent,
  getNextEvent,
  minutesUntil,
  isBeforeDay,
  isAfterDay,
  formatDuration,
} from "@/lib/time";
import { schedule } from "@/data/schedule";

export function CurrentStatus() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className="border border-border-subtle bg-bg-secondary rounded-lg p-5 min-h-[160px]" aria-hidden />
    );
  }

  if (isBeforeDay(now)) {
    const first = schedule[0];
    return (
      <div className="border border-border-subtle bg-bg-secondary rounded-lg p-5">
        <Eyebrow>Przed nami</Eyebrow>
        <p className="font-display text-2xl mt-2 leading-tight">
          Dzień zaczyna się o {first.timeStart}
        </p>
        <p className="text-sm text-fg-secondary mt-2">
          Następne: {first.title}
        </p>
        <div className="mt-4">
          <Button href="/plan" variant="secondary" size="md" iconRight={ArrowRight}>
            Zobacz plan
          </Button>
        </div>
      </div>
    );
  }

  if (isAfterDay(now)) {
    return (
      <div className="border border-border-subtle bg-bg-secondary rounded-lg p-5">
        <Eyebrow>Dzień skończony</Eyebrow>
        <p className="font-display text-2xl mt-2 leading-tight">
          Jak się bawiliście?
        </p>
        <p className="text-sm text-fg-secondary mt-2">
          Wracajcie do planu, żeby odhaczyć zwiedzone miejsca.
        </p>
        <div className="mt-4">
          <Button href="/plan" variant="secondary" size="md" iconRight={ArrowRight}>
            Zobacz plan
          </Button>
        </div>
      </div>
    );
  }

  const current = getCurrentEvent(now);
  const next = getNextEvent(now);

  if (current) {
    const remaining = minutesUntil(current.timeEnd, now);
    return (
      <div className="border border-accent bg-bg-elevated rounded-lg p-5">
        <Eyebrow color="accent">Teraz</Eyebrow>
        <p className="font-display text-2xl mt-2 leading-tight">{current.title}</p>
        {current.subtitle && (
          <p className="text-sm text-fg-secondary italic mt-1">{current.subtitle}</p>
        )}
        <p className="text-sm text-accent mt-3 font-mono">
          Pozostało {formatDuration(remaining)}
        </p>
        {next && (
          <p className="text-xs text-fg-muted mt-2 tracking-wider uppercase">
            Następne · {next.timeStart} · {next.title}
          </p>
        )}
        <div className="mt-4">
          <Button href="/plan" variant="primary" size="md" iconRight={ArrowRight} fullWidth>
            Otwórz plan dnia
          </Button>
        </div>
      </div>
    );
  }

  if (next) {
    const until = minutesUntil(next.timeStart, now);
    return (
      <div className="border border-border-subtle bg-bg-secondary rounded-lg p-5">
        <Eyebrow>Przerwa</Eyebrow>
        <p className="font-display text-2xl mt-2 leading-tight">
          Za {formatDuration(until)}: {next.title}
        </p>
        <p className="text-xs text-fg-muted mt-2 font-mono">
          O {next.timeStart}
        </p>
        <div className="mt-4">
          <Button href="/plan" variant="secondary" size="md" iconRight={ArrowRight}>
            Zobacz plan
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
