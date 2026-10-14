"use client";

import Link from "next/link";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectButton } from "@/features/network/connect-button";
import { useDemoState } from "@/lib/store/hooks";
import { selectUsersByConnection } from "@/lib/store/selectors";

export function SuggestedConnections({ limit = 4 }) {
  const suggestions = selectUsersByConnection(useDemoState(), "none").slice(0, limit);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">People you may know</CardTitle>
      </CardHeader>
      <CardContent>
        {suggestions.length === 0 ? (
          <p className="text-sm text-muted-foreground">You&apos;re connected with everyone here.</p>
        ) : (
          <ul className="space-y-4">
            {suggestions.map((user) => (
              <li key={user.id} className="flex items-start gap-3">
                <UserAvatar name={user.name} size="sm" />
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div>
                    <Link
                      href={`/profile/${user.username}`}
                      className="block truncate text-sm font-medium hover:underline"
                    >
                      {user.name}
                    </Link>
                    <p className="truncate text-xs text-muted-foreground">{user.title}</p>
                  </div>
                  <ConnectButton userId={user.id} name={user.name} size="sm" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
