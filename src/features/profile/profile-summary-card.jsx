"use client";

import Link from "next/link";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCount } from "@/lib/format";
import { useCurrentUser } from "@/lib/store/hooks";

export function ProfileSummaryCard() {
  const user = useCurrentUser();
  if (!user) return null;

  return (
    <Card className="pt-0">
      <div className="h-16 bg-gradient-to-r from-primary/80 to-violet-400" aria-hidden="true" />
      <CardContent className="-mt-10 space-y-3">
        <UserAvatar name={user.name} size="lg" className="ring-4 ring-card" />
        <div>
          <Link href={`/profile/${user.username}`} className="font-semibold hover:underline">
            {user.name}
          </Link>
          <p className="text-xs text-muted-foreground">{user.headline}</p>
        </div>
        <Separator />
        <dl className="space-y-1 text-xs">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Location</dt>
            <dd className="text-right">{user.location}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Network</dt>
            <dd>{formatCount(user.connections, "connection")}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
