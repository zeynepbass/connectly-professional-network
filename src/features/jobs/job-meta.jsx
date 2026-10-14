import { Badge } from "@/components/ui/badge";
import { formatRelativeTime, minutesAgoToIso } from "@/lib/format";

export function postedLabel(job) {
  return `Posted ${formatRelativeTime(minutesAgoToIso(job.postedDaysAgo * 24 * 60))}`;
}

export function JobBadges({ job, applied }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Job details">
      <li>
        <Badge variant="secondary">{job.workplace}</Badge>
      </li>
      <li>
        <Badge variant="outline">{job.type}</Badge>
      </li>
      <li>
        <Badge variant="outline">{job.level} level</Badge>
      </li>
      {applied && (
        <li>
          <Badge className="bg-success text-success-foreground">Applied</Badge>
        </li>
      )}
    </ul>
  );
}
