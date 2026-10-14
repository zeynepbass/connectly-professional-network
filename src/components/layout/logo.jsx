import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, showWordmark = true, href = "/feed" }) {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2 rounded-md font-semibold", className)}
      aria-label="Connectly home"
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
        C
      </span>
      {showWordmark && <span className="text-lg tracking-tight">Connectly</span>}
    </Link>
  );
}
