// @vitest-environment node
import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";
import { GET as getJob } from "@/app/api/jobs/[id]/route";
import { GET as getJobs } from "@/app/api/jobs/route";
import { GET as getUser } from "@/app/api/users/[username]/route";
import { GET as getUsers } from "@/app/api/users/route";

vi.mock("@/lib/mock-api", async (importOriginal) => ({
  ...(await importOriginal()),
  wait: () => Promise.resolve(),
}));

const request = (path) => new NextRequest(new URL(path, "http://localhost"));
const params = (value) => ({ params: Promise.resolve(value) });

describe("GET /api/users", () => {
  it("returns filtered public profile fields", async () => {
    const response = await getUsers(request("/api/users?skill=Figma"));
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.total).toBe(2);
    expect(body.data.map((user) => user.username)).toEqual(["priya-raman", "grace-mensah"]);
    expect(body.data[0]).not.toHaveProperty("experience");
  });

  it("can simulate a server error", async () => {
    const response = await getUsers(request("/api/users?simulateError=1"));
    expect(response.status).toBe(500);
    expect((await response.json()).error.message).toMatch(/simulated/i);
  });
});

describe("GET /api/users/[username]", () => {
  it("returns a full profile or 404", async () => {
    const found = await getUser(request("/api/users/hana-sato"), params({ username: "hana-sato" }));
    expect((await found.json()).data.name).toBe("Hana Sato");

    const missing = await getUser(request("/api/users/nobody"), params({ username: "nobody" }));
    expect(missing.status).toBe(404);
  });
});

describe("GET /api/jobs", () => {
  it("applies query filters", async () => {
    const response = await getJobs(request("/api/jobs?workplace=Remote&level=Senior"));
    const body = await response.json();
    expect(body.data.map((job) => job.id)).toEqual(["j2", "j6", "j9"]);
  });

  it("returns a job by id or 404", async () => {
    const found = await getJob(request("/api/jobs/j4"), params({ id: "j4" }));
    expect((await found.json()).data.type).toBe("Internship");
    const missing = await getJob(request("/api/jobs/zzz"), params({ id: "zzz" }));
    expect(missing.status).toBe(404);
  });
});
