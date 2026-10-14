"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, CheckCircle2, MapPin, Users } from "lucide-react";
import { DemoBadge } from "@/components/shared/demo-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApplicationForm } from "@/features/jobs/application-form";
import { JobBadges, postedLabel } from "@/features/jobs/job-meta";
import { SaveJobButton } from "@/features/jobs/save-job-button";
import { useDemoState } from "@/lib/store/hooks";
import { selectCurrentUser } from "@/lib/store/selectors";

function DetailList({ title, items }) {
  return (
    <section className="space-y-2">
      <h2 className="font-semibold">{title}</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-primary">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function JobDetail({ job }) {
  const state = useDemoState();
  const user = selectCurrentUser(state);
  const application = state.applications[job.id];
  const [applying, setApplying] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <Button asChild variant="ghost" size="sm">
        <Link href="/jobs">
          <ArrowLeft aria-hidden="true" /> Back to jobs
        </Link>
      </Button>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <Building2 className="size-7" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">{job.title}</h1>
              <p>{job.company}</p>
              <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-4" aria-hidden="true" /> {job.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="size-4" aria-hidden="true" /> {job.applicants} applicants
                </span>
                <span>{postedLabel(job)}</span>
              </p>
            </div>
          </div>
          <JobBadges job={job} applied={Boolean(application)} />
          <p className="font-medium">{job.salary}</p>
          <div className="flex flex-wrap gap-2">
            {!application && !applying && (
              <Button className="h-10" onClick={() => setApplying(true)}>
                Apply now
              </Button>
            )}
            <SaveJobButton job={job} showLabel className="h-10" />
          </div>
        </CardContent>
      </Card>

      {application && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 p-4 text-sm"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
          <div>
            <p className="font-medium">Application submitted</p>
            <p className="text-muted-foreground">
              Sent on {new Date(application.appliedAt).toLocaleDateString("en", { dateStyle: "medium" })}.
              This is a demo, so {job.company} won&apos;t actually receive it.
            </p>
          </div>
        </div>
      )}

      {applying && !application && user && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-lg">Apply to {job.company}</CardTitle>
              <DemoBadge label="Simulated" />
            </div>
          </CardHeader>
          <CardContent>
            <ApplicationForm job={job} user={user} onCancel={() => setApplying(false)} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="space-y-5">
          <section className="space-y-2">
            <h2 className="font-semibold">About the role</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
          </section>
          <DetailList title="What you'll do" items={job.responsibilities} />
          <DetailList title="What we're looking for" items={job.requirements} />
          <section className="space-y-2">
            <h2 className="font-semibold">Skills</h2>
            <ul className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <li key={skill}>
                  <Badge variant="outline">{skill}</Badge>
                </li>
              ))}
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
