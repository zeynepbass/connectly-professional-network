"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Pencil, RotateCcw, UserRound } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/lib/store/hooks";
import { dispatch } from "@/lib/store/store";

export function ProfileMenu() {
  const user = useCurrentUser();
  const router = useRouter();

  if (!user) return null;

  function signOut() {
    dispatch({ type: "auth/signOut" });
    router.replace("/sign-in");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-full focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        aria-label="Open profile menu"
      >
        <UserAvatar name={user.name} size="sm" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-3 py-2">
          <UserAvatar name={user.name} size="md" />
          <span className="min-w-0">
            <span className="block truncate font-semibold text-foreground">{user.name}</span>
            <span className="block truncate text-xs font-normal text-muted-foreground">
              {user.title} at {user.company}
            </span>
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/profile/${user.username}`}>
            <UserRound aria-hidden="true" /> View profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/profile">
            <Pencil aria-hidden="true" /> Edit profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => dispatch({ type: "demo/reset" })}>
          <RotateCcw aria-hidden="true" /> Reset demo data
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={signOut}>
          <LogOut aria-hidden="true" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
