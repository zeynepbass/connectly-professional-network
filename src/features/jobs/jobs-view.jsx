"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, X } from "lucide-react";
import { DemoBadge } from "@/components/shared/demo-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { NativeSelect } from "@/components/shared/native-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { JOB_FILTERS } from "@/data/jobs";
import { JobCard } from "@/features/jobs/job-card";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useFetchJson } from "@/hooks/use-fetch-json";
import { formatCount } from "@/lib/format";
import { useDemoState } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

const EMPTY_FILTERS = { q: "", workplace: "", type: "", level: "" };

const views = [
  { id: "all", label: "All jobs" },
  { id: "saved", label: "Saved" },
  { id: "applied", label: "Applied" },
];

const selectFilters = [
  { key: "workplace", label: "Workplace", allLabel: "Any workplace" },
  { key: "type", label: "Job type", allLabel: "Any type" },
  { key: "level", label: "Experience", allLabel: "Any level" },
];

function buildQuery(filters) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }
  return params.toString();
}

function JobsSkeleton() {
  return (
    <div aria-hidden="true" className="space-y-3">
      {[0, 1, 2].map((key) => (
        <div key={key} className="flex gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
          <Skeleton className="size-12" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function JobsView({ initialFilters, initialView }) {
  const { savedJobIds, applications } = useDemoState();
  const [filters, setFilters] = useState(initialFilters);
  const [view, setView] = useState(initialView);
  const debouncedQ = useDebouncedValue(filters.q);
  const apiQuery = buildQuery({ ...filters, q: debouncedQ });
  const { data, error, loading, retry } = useFetchJson(`/api/jobs?${apiQuery}`);

  useEffect(() => {
    const query = buildQuery({ ...filters, q: debouncedQ, view: view === "all" ? "" : view });
    window.history.replaceState(null, "", query ? `/jobs?${query}` : "/jobs");
  }, [filters, debouncedQ, view]);

  const jobs = (data?.data ?? []).filter((job) => {
    if (view === "saved") return savedJobIds.includes(job.id);
    if (view === "applied") return Boolean(applications[job.id]);
    return true;
  });
  const hasFilters = Object.values(filters).some(Boolean);

  function update(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  const emptyCopy = {
    all: ["No jobs match these filters", "Try another keyword or clear the filters."],
    saved: ["No saved jobs here", "Save roles with the bookmark button to find them quickly later."],
    applied: ["No applications yet", "Open a job and submit a demo application."],
  }[view];

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Jobs</h1>
        <DemoBadge label="Mock listings" />
      </div>

      <Card>
        <CardContent>
          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="jobs-q">Keywords</Label>
              <Input
                id="jobs-q"
                type="search"
                value={filters.q}
                onChange={(event) => update("q", event.target.value)}
                placeholder="Title, company, skill…"
                className="h-10"
              />
            </div>
            {selectFilters.map(({ key, label, allLabel }) => (
              <div key={key} className="space-y-1.5">
                <Label htmlFor={`jobs-${key}`}>{label}</Label>
                <NativeSelect
                  id={`jobs-${key}`}
                  value={filters[key]}
                  onChange={(event) => update(key, event.target.value)}
                >
                  <option value="">{allLabel}</option>
                  {JOB_FILTERS[key].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </NativeSelect>
              </div>
            ))}
          </form>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div role="group" aria-label="Job list view" className="inline-flex rounded-lg bg-muted p-1">
          {views.map(({ id, label }) => {
            const count =
              id === "saved" ? savedJobIds.length : id === "applied" ? Object.keys(applications).length : null;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={view === id}
                onClick={() => setView(id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                  view === id && "bg-card font-medium text-foreground shadow-sm"
                )}
              >
                {label}
                {count !== null && count > 0 && <span className="ml-1 text-xs">({count})</span>}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <p role="status" className="text-sm text-muted-foreground">
            {loading ? "Loading jobs…" : error ? "" : formatCount(jobs.length, "job")}
          </p>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={() => setFilters(EMPTY_FILTERS)}>
              <X aria-hidden="true" /> Clear
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <JobsSkeleton />
      ) : error ? (
        <ErrorState title="Couldn't load jobs" message={error.message} onRetry={retry} />
      ) : jobs.length === 0 ? (
        <EmptyState icon={BriefcaseBusiness} title={emptyCopy[0]} description={emptyCopy[1]} />
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li key={job.id}>
              <JobCard job={job} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
