"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import { JobBadges, postedLabel } from "@/features/jobs/job-meta";
import { SaveJobButton } from "@/features/jobs/save-job-button";
import { useDemoState } from "@/lib/store/hooks";

export function JobCard({ job }) {
  const { applications } = useDemoState();

  return (
    <article className="flex gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Building2 className="size-6" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1 space-y-2">
        <div>
          <h2 className="font-semibold">
            <Link href={`/jobs/${job.id}`} className="hover:underline">
              {job.title}
            </Link>
          </h2>
          <p className="text-sm">{job.company}</p>
          <p className="text-sm text-muted-foreground">
            {job.location} · {job.salary}
          </p>
        </div>
        <JobBadges job={job} applied={Boolean(applications[job.id])} />
        <p className="text-xs text-muted-foreground">
          {postedLabel(job)} · {job.applicants} applicants
        </p>
      </div>
      <SaveJobButton job={job} className="shrink-0" />
    </article>
  );
}
