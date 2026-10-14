import { describe, expect, it } from "vitest";
import { formatCount, formatRelativeTime, minutesAgoToIso } from "@/lib/format";

const now = Date.parse("2026-03-10T12:00:00.000Z");

describe("formatRelativeTime", () => {
  it.each([
    [0, "just now"],
    [5, "5 minutes ago"],
    [60, "1 hour ago"],
    [60 * 24, "yesterday"],
    [60 * 24 * 3, "3 days ago"],
    [60 * 24 * 14, "2 weeks ago"],
  ])("formats %i minutes ago as %s", (minutes, expected) => {
    expect(formatRelativeTime(minutesAgoToIso(minutes, now), now)).toBe(expected);
  });
});

describe("formatCount", () => {
  it("pluralizes and formats numbers", () => {
    expect(formatCount(1, "like")).toBe("1 like");
    expect(formatCount(1340, "connection")).toBe("1,340 connections");
  });
});
