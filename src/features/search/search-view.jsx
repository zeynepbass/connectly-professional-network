"use client";

import { useEffect, useState } from "react";
import { SearchX, X } from "lucide-react";
import { DemoBadge } from "@/components/shared/demo-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { NativeSelect } from "@/components/shared/native-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ConnectButton } from "@/features/network/connect-button";
import { PersonRow } from "@/features/network/person-row";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useFetchJson } from "@/hooks/use-fetch-json";
import { formatCount } from "@/lib/format";
import { useDemoState } from "@/lib/store/hooks";
import { selectUser } from "@/lib/store/selectors";

function buildQuery(filters) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }
  return params.toString();
}

function ResultsSkeleton() {
  return (
    <ul aria-hidden="true" className="space-y-3">
      {[0, 1, 2, 3].map((key) => (
        <li key={key} className="flex items-center gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function SearchView({ initialFilters, facets }) {
  const state = useDemoState();
  const [filters, setFilters] = useState(initialFilters);
  const debouncedQ = useDebouncedValue(filters.q);
  const queryString = buildQuery({ q: debouncedQ, title: filters.title, skill: filters.skill });
  const { data, error, loading, retry } = useFetchJson(`/api/users?${queryString}`);

  useEffect(() => {
    window.history.replaceState(null, "", queryString ? `/search?${queryString}` : "/search");
  }, [queryString]);

  const results = (data?.data ?? [])
    .filter((user) => user.id !== state.session?.userId)
    .map((user) => selectUser(state, user.id) ?? user);
  const hasFilters = Boolean(filters.q || filters.title || filters.skill);

  function update(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Search people</h1>
        <DemoBadge label="Mock API" />
      </div>

      <Card>
        <CardContent>
          <form
            role="search"
            onSubmit={(event) => event.preventDefault()}
            className="grid gap-3 sm:grid-cols-[1fr_180px_180px]"
          >
            <div className="space-y-1.5">
              <Label htmlFor="search-q">Keywords</Label>
              <Input
                id="search-q"
                type="search"
                value={filters.q}
                onChange={(event) => update("q", event.target.value)}
                placeholder="Name, company, skill…"
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="search-title">Title</Label>
              <NativeSelect
                id="search-title"
                value={filters.title}
                onChange={(event) => update("title", event.target.value)}
              >
                <option value="">All titles</option>
                {facets.titles.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </NativeSelect>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="search-skill">Skill</Label>
              <NativeSelect
                id="search-skill"
                value={filters.skill}
                onChange={(event) => update("skill", event.target.value)}
              >
                <option value="">All skills</option>
                {facets.skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </NativeSelect>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="flex min-h-8 items-center justify-between gap-2">
        <p role="status" className="text-sm text-muted-foreground">
          {loading ? "Searching…" : error ? "" : `${formatCount(results.length, "result")}`}
        </p>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={() => setFilters({ q: "", title: "", skill: "" })}>
            <X aria-hidden="true" /> Clear filters
          </Button>
        )}
      </div>

      {loading ? (
        <ResultsSkeleton />
      ) : error ? (
        <ErrorState title="Couldn't load people" message={error.message} onRetry={retry} />
      ) : results.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No people match your search"
          description="Try a different keyword or remove a filter."
        />
      ) : (
        <ul className="space-y-3">
          {results.map((user) => (
            <li key={user.id} className="rounded-xl bg-card p-4 ring-1 ring-foreground/10">
              <PersonRow user={user}>
                <ConnectButton userId={user.id} name={user.name} />
              </PersonRow>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${user.name}'s skills`}>
                {user.skills.slice(0, 5).map((skill) => (
                  <li key={skill} className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                    {skill}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
