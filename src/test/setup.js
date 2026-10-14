import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

export const routerMock = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

vi.mock("next/navigation", () => ({
  useRouter: () => routerMock,
  usePathname: () => "/feed",
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  notFound: vi.fn(),
}));

if (typeof window !== "undefined") {
  Element.prototype.scrollIntoView = vi.fn();

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });
}
