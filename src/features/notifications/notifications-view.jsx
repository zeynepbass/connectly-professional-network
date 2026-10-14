"use client";

import { useState } from "react";
import Link from "next/link";
import { BellOff, BriefcaseBusiness, CheckCheck, Eye, Heart, MessageCircle, UserPlus } from "lucide-react";
import { DemoBadge } from "@/components/shared/demo-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { RelativeTime } from "@/components/shared/relative-time";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/store/actions";
import { useDemoState } from "@/lib/store/hooks";
import { selectUnreadNotificationCount, selectUser } from "@/lib/store/selectors";
import { cn } from "@/lib/utils";

const typeIcons = {
  like: Heart,
  comment: MessageCircle,
  connection: UserPlus,
  job: BriefcaseBusiness,
  view: Eye,
};

const filters = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
];

export function NotificationsView() {
  const state = useDemoState();
  const [filter, setFilter] = useState("all");
  const unreadCount = selectUnreadNotificationCount(state);
  const items = [...state.notifications]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .filter((notification) => filter === "all" || !notification.read);

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <DemoBadge />
        </div>
        <Button variant="outline" onClick={markAllNotificationsRead} disabled={unreadCount === 0}>
          <CheckCheck aria-hidden="true" /> Mark all as read
        </Button>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div role="group" aria-label="Filter notifications" className="inline-flex rounded-lg bg-muted p-1">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                filter === id && "bg-card font-medium text-foreground shadow-sm"
              )}
            >
              {label}
              {id === "unread" && unreadCount > 0 && <span className="ml-1 text-xs">({unreadCount})</span>}
            </button>
          ))}
        </div>
        <p role="status" className="text-sm text-muted-foreground">
          {unreadCount === 0 ? "You're all caught up" : `${unreadCount} unread`}
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={BellOff}
          title={filter === "unread" ? "No unread notifications" : "No notifications"}
          description="New activity from your network will appear here."
        />
      ) : (
        <Card className="gap-0 py-0">
          <ul className="divide-y">
            {items.map((notification) => {
              const actor = selectUser(state, notification.actorId);
              const Icon = typeIcons[notification.type] ?? MessageCircle;
              if (!actor) return null;
              return (
                <li key={notification.id} className={cn("relative", !notification.read && "bg-secondary/50")}>
                  <div className="flex items-start gap-3 px-4 py-4">
                    <span className="relative">
                      <UserAvatar name={actor.name} />
                      <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-card">
                        <Icon className="size-3" aria-hidden="true" />
                      </span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm">
                        <Link
                          href={notification.href}
                          onClick={() => markNotificationRead(notification.id)}
                          className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-3 focus-visible:after:ring-ring/50 focus-visible:after:ring-inset"
                        >
                          <span className="font-semibold">{actor.name}</span> {notification.text}
                        </Link>
                      </p>
                      <RelativeTime iso={notification.createdAt} className="text-xs text-muted-foreground" />
                    </div>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="relative z-10"
                        onClick={() => markNotificationRead(notification.id)}
                        aria-label={`Mark notification from ${actor.name} as read`}
                      >
                        Mark read
                      </Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </div>
  );
}
