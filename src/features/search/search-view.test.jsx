import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { users } from "@/data/users";
import { SearchView } from "@/features/search/search-view";
import { filterUsers, getUserFacets } from "@/lib/search";
import { resetDemoStore } from "@/test/utils";

const facets = getUserFacets(users);
const emptyFilters = { q: "", title: "", skill: "" };

function mockApi() {
  return vi.spyOn(globalThis, "fetch").mockImplementation(async (url) => {
    const params = new URL(url, "http://localhost").searchParams;
    const data = filterUsers(users, {
      q: params.get("q") ?? "",
      title: params.get("title") ?? "",
      skill: params.get("skill") ?? "",
    });
    return Response.json({ data, total: data.length });
  });
}

describe("SearchView", () => {
  beforeEach(() => resetDemoStore());

  it("shows a loading state, then results without the signed-in user", async () => {
    mockApi();
    render(<SearchView initialFilters={emptyFilters} facets={facets} />);

    expect(screen.getByRole("status")).toHaveTextContent("Searching…");
    expect(await screen.findByText("11 results")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Alex Morgan" })).not.toBeInTheDocument();
  });

  it("filters by skill and shows an empty state", async () => {
    const fetchMock = mockApi();
    const user = userEvent.setup();
    render(<SearchView initialFilters={emptyFilters} facets={facets} />);
    await screen.findByText("11 results");

    await user.selectOptions(screen.getByLabelText("Skill"), "Figma");
    expect(await screen.findByText("2 results")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenLastCalledWith("/api/users?skill=Figma", expect.anything());

    await user.selectOptions(screen.getByLabelText("Title"), "Backend Engineer");
    expect(await screen.findByText("No people match your search")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(await screen.findByText("11 results")).toBeInTheDocument();
  });

  it("shows an error state and retries", async () => {
    mockApi().mockImplementationOnce(async () =>
      Response.json({ error: { message: "Service unavailable" } }, { status: 503 })
    );
    const user = userEvent.setup();
    render(<SearchView initialFilters={{ ...emptyFilters, skill: "Go" }} facets={facets} />);

    expect(await screen.findByRole("alert")).toHaveTextContent("Service unavailable");
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByText("1 result")).toBeInTheDocument();
  });
});
