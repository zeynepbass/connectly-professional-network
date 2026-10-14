"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useDemoState, useHydrated } from "@/lib/store/hooks";

function ShellSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite" className="flex flex-1 flex-col">
      <span className="sr-only">Loading Connectly</span>
      <div className="h-(--header-height) border-b bg-card" />
      <div className="container-app grid flex-1 gap-4 py-6 md:grid-cols-[220px_1fr]">
        <Skeleton className="hidden h-48 md:block" />
        <div className="space-y-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </div>
      </div>
    </div>
  );
}

export function AuthGate({ children }) {
  const hydrated = useHydrated();
  const { session } = useDemoState();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (hydrated && !session) {
      router.replace(`/sign-in?next=${encodeURIComponent(pathname)}`);
    }
  }, [hydrated, session, pathname, router]);

  if (!hydrated || !session) return <ShellSkeleton />;
  return children;
}
