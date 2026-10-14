const relativeFormatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

const units = [
  ["year", 60 * 24 * 365],
  ["month", 60 * 24 * 30],
  ["week", 60 * 24 * 7],
  ["day", 60 * 24],
  ["hour", 60],
  ["minute", 1],
];

export function minutesAgoToIso(minutes, now = Date.now()) {
  return new Date(now - minutes * 60_000).toISOString();
}

export function formatRelativeTime(iso, now = Date.now()) {
  const diffMinutes = Math.round((new Date(iso).getTime() - now) / 60_000);
  if (Math.abs(diffMinutes) < 1) return "just now";
  for (const [unit, size] of units) {
    if (Math.abs(diffMinutes) >= size) {
      return relativeFormatter.format(Math.round(diffMinutes / size), unit);
    }
  }
  return "just now";
}

export function formatCount(value, singular, plural = `${singular}s`) {
  return `${value.toLocaleString("en")} ${value === 1 ? singular : plural}`;
}
