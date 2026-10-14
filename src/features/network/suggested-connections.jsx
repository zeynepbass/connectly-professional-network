"use client";

import Link from "next/link";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDemoState } from "@/lib/store/hooks";
import { selectUsers } from "@/lib/store/selectors";

export function SuggestedConnections({ limit = 4 }) {
  const state = useDemoState();
  const currentUserId = state.session?.userId;
  const suggestions = selectUsers(state)
    .filter((user) => user.id !== currentUserId)
    .slice(0, limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">People you may know</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {suggestions.map((user) => (
            <li key={user.id} className="flex items-center gap-3">
              <UserAvatar name={user.name} size="sm" />
              <div className="min-w-0">
                <Link
                  href={`/profile/${user.username}`}
                  className="block truncate text-sm font-medium hover:underline"
                >
                  {user.name}
                </Link>
                <p className="truncate text-xs text-muted-foreground">{user.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
