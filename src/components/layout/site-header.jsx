"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ProfileMenu } from "@/components/layout/profile-menu";
import { DemoBadge } from "@/components/shared/demo-badge";
import { isActivePath, navItems } from "@/components/layout/nav-items";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container-app flex h-(--header-height) items-center gap-3">
        <Logo showWordmark={false} className="sm:hidden" />
        <Logo className="hidden sm:flex" />
        <DemoBadge className="hidden lg:inline-flex" />

        <form action="/search" role="search" className="relative flex-1 md:max-w-xs">
          <label htmlFor="global-search" className="sr-only">
            Search people
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="global-search"
            name="q"
            type="search"
            placeholder="Search people, titles, skills"
            className="h-9 w-full rounded-lg border bg-muted pr-3 pl-9 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
          />
        </form>

        <nav aria-label="Primary" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = isActivePath(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-w-16 flex-col items-center gap-0.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none",
                      active && "text-foreground"
                    )}
                  >
                    <Icon className={cn("size-5", active && "text-primary")} aria-hidden="true" />
                    <span className={cn(active && "font-medium")}>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ProfileMenu />
      </div>
    </header>
  );
}
