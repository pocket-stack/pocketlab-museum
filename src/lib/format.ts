// src/lib/format.ts — small formatting helpers shared by pages.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-08-16" → "16 Aug 2026" without touching the local time zone. */
export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m;
  return `${Number(d)} ${MONTHS[Number(mo) - 1] ?? mo} ${y}`;
}

/** "2026-08-16T10:11:12+02:00" → "2026-08-16". */
export function isoDay(iso: string): string {
  return iso.slice(0, 10);
}

export function viewportLabel(v: readonly [number, number] | undefined): string {
  return v ? `${v[0]} × ${v[1]}` : "—";
}

export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 220));
}
