import { formatRelativeTime } from "@/lib/format";

export function RelativeTime({ iso, className }) {
  return (
    <time dateTime={iso} title={new Date(iso).toLocaleString("en")} className={className}>
      {formatRelativeTime(iso)}
    </time>
  );
}
