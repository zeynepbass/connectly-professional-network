import { JobsView } from "@/features/jobs/jobs-view";

export const metadata = { title: "Jobs · Connectly" };

const VIEWS = ["all", "saved", "applied"];

function first(value) {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default async function JobsPage({ searchParams }) {
  const params = await searchParams;
  const initialFilters = {
    q: first(params.q),
    workplace: first(params.workplace),
    type: first(params.type),
    level: first(params.level),
  };
  const view = VIEWS.includes(first(params.view)) ? first(params.view) : "all";

  return <JobsView initialFilters={initialFilters} initialView={view} />;
}
