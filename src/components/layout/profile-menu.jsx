"use client";

import Link from "next/link";
import { LogOut, Pencil, UserRound } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const placeholderUser = { name: "Demo User", headline: "Connectly member", username: "me" };

export function ProfileMenu() {
  const user = placeholderUser;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-full focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        aria-label="Open profile menu"
      >
        <UserAvatar name={user.name} size="sm" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex items-center gap-3 py-2">
          <UserAvatar name={user.name} size="md" />
          <span className="min-w-0">
            <span className="block truncate font-semibold text-foreground">{user.name}</span>
            <span className="block truncate text-xs font-normal text-muted-foreground">
              {user.headline}
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
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <LogOut aria-hidden="true" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
