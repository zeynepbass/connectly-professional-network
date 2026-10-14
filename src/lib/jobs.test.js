import { describe, expect, it } from "vitest";
import { jobs } from "@/data/jobs";
import { filterJobs, findJobById } from "@/lib/jobs";

const ids = (list) => list.map((job) => job.id);

describe("filterJobs", () => {
  it("filters by workplace", () => {
    expect(ids(filterJobs(jobs, { workplace: "Remote" }))).toEqual(["j2", "j6", "j9"]);
  });

  it("filters by type and level together", () => {
    expect(ids(filterJobs(jobs, { type: "Full-time", level: "Entry" }))).toEqual(["j8"]);
  });

  it("searches title, company, location and skills", () => {
    expect(ids(filterJobs(jobs, { q: "react berlin" }))).toEqual(["j1"]);
    expect(filterJobs(jobs, { q: "cobol" })).toEqual([]);
  });
});

describe("findJobById", () => {
  it("returns a job or null", () => {
    expect(findJobById("j3")?.company).toBe("Lumen Health");
    expect(findJobById("missing")).toBeNull();
  });
});
