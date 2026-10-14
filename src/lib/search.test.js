import { describe, expect, it } from "vitest";
import { users } from "@/data/users";
import { filterUsers, getUserFacets } from "@/lib/search";

const names = (list) => list.map((user) => user.name);

describe("filterUsers", () => {
  it("returns everyone without filters", () => {
    expect(filterUsers(users)).toHaveLength(users.length);
  });

  it("matches every search term across name, headline and skills", () => {
    expect(names(filterUsers(users, { q: "figma research" }))).toEqual(["Priya Raman", "Grace Mensah"]);
  });

  it("filters by exact title, case-insensitively", () => {
    expect(names(filterUsers(users, { title: "data scientist" }))).toEqual(["Marco Bianchi"]);
  });

  it("filters by skill", () => {
    expect(names(filterUsers(users, { skill: "Accessibility" }))).toEqual([
      "Alex Morgan",
      "Priya Raman",
      "Elif Yılmaz",
    ]);
  });

  it("combines filters", () => {
    expect(names(filterUsers(users, { skill: "Accessibility", q: "lumen" }))).toEqual([
      "Priya Raman",
      "Elif Yılmaz",
    ]);
  });
});

describe("getUserFacets", () => {
  it("returns sorted unique titles and skills", () => {
    const { titles, skills } = getUserFacets(users);
    expect(titles).toEqual([...new Set(titles)].sort((a, b) => a.localeCompare(b)));
    expect(skills).toContain("React");
    expect(new Set(skills).size).toBe(skills.length);
  });
});
