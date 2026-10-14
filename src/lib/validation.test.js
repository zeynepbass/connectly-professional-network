import { describe, expect, it } from "vitest";
import {
  getSafeRedirect,
  parseSkills,
  validateApplication,
  validateProfile,
  validateSignIn,
  validateText,
} from "@/lib/validation";

describe("validateSignIn", () => {
  it("requires email and password", () => {
    expect(validateSignIn({ email: " ", password: "" })).toEqual({
      email: "Enter your email address.",
      password: "Enter your password.",
    });
  });

  it("rejects malformed emails and short passwords", () => {
    expect(validateSignIn({ email: "alex@", password: "short" })).toEqual({
      email: "Enter a valid email address.",
      password: "Password must be at least 8 characters.",
    });
  });

  it("accepts valid input", () => {
    expect(validateSignIn({ email: "demo@connectly.dev", password: "connectly123" })).toEqual({});
  });
});

describe("getSafeRedirect", () => {
  it("allows relative paths", () => {
    expect(getSafeRedirect("/jobs?view=saved")).toBe("/jobs?view=saved");
  });

  it.each([undefined, "https://evil.example", "//evil.example", "jobs"])(
    "falls back for %s",
    (target) => {
      expect(getSafeRedirect(target)).toBe("/feed");
    }
  );
});

describe("validateText", () => {
  it("reports empty and too long values", () => {
    expect(validateText("   ", { label: "Post", max: 5 })).toBe("Post can't be empty.");
    expect(validateText("123456", { label: "Post", max: 5 })).toBe("Post must be 5 characters or fewer.");
    expect(validateText("", { label: "Note", max: 5, required: false })).toBeNull();
  });
});

describe("parseSkills", () => {
  it("trims, drops blanks and removes case-insensitive duplicates", () => {
    expect(parseSkills(" React, , next.js, react ,Vitest")).toEqual(["React", "next.js", "Vitest"]);
  });
});

describe("validateProfile", () => {
  const valid = {
    name: "Alex Morgan",
    headline: "Frontend Engineer",
    title: "Engineer",
    company: "",
    location: "",
    about: "",
    skills: "React",
  };

  it("accepts a valid profile", () => {
    expect(validateProfile(valid)).toEqual({});
  });

  it("requires name, headline and title", () => {
    const errors = validateProfile({ ...valid, name: "", headline: "", title: "" });
    expect(Object.keys(errors)).toEqual(["name", "headline", "title"]);
  });

  it("limits the number of skills", () => {
    const skills = Array.from({ length: 16 }, (_, index) => `Skill ${index}`).join(",");
    expect(validateProfile({ ...valid, skills }).skills).toBe("Add up to 15 skills.");
  });
});

describe("validateApplication", () => {
  it("validates email and optional phone", () => {
    expect(validateApplication({ name: "Alex", email: "nope", phone: "abc", note: "" })).toEqual({
      email: "Enter a valid email address.",
      phone: "Enter a valid phone number.",
    });
    expect(
      validateApplication({ name: "Alex", email: "a@b.co", phone: "+31 6 1234 5678", note: "Hi" })
    ).toEqual({});
  });
});
