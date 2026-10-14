"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavCount } from "@/components/layout/nav-count";
import { isActivePath, navItems } from "@/components/layout/nav-items";
import { useDemoState } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const state = useDemoState();

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-5">
        {navItems.map(({ href, label, icon: Icon, count, countLabel }) => {
          const active = isActivePath(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2 text-[11px] text-muted-foreground focus-visible:bg-muted focus-visible:outline-none",
                  active && "text-primary"
                )}
              >
                <span className="relative">
                  <Icon className="size-5" aria-hidden="true" />
                  <NavCount count={count?.(state)} label={countLabel} />
                </span>
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
