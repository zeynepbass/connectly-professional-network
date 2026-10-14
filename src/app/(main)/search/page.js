import { SearchView } from "@/features/search/search-view";
import { getUserFacets } from "@/lib/search";
import { getAllUsers } from "@/lib/users";

export const metadata = { title: "Search · Connectly" };

function first(value) {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const initialFilters = { q: first(params.q), title: first(params.title), skill: first(params.skill) };

  return (
    <SearchView
      key={JSON.stringify(initialFilters)}
      initialFilters={initialFilters}
      facets={getUserFacets(getAllUsers())}
    />
  );
}
