"use client";

import { RelativeTime } from "@/components/shared/relative-time";
import { UserAvatar } from "@/components/shared/user-avatar";
import { cn } from "@/lib/utils";

export function ConversationList({ items, selectedParticipantId, onSelect }) {
  return (
    <ul aria-label="Conversations" className="divide-y">
      {items.map(({ conversation, participant }) => {
        const last = conversation.messages.at(-1);
        const selected = participant.id === selectedParticipantId;
        return (
          <li key={conversation.id}>
            <button
              type="button"
              onClick={() => onSelect(participant.id)}
              aria-current={selected ? "true" : undefined}
              className={cn(
                "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
                selected && "bg-secondary hover:bg-secondary"
              )}
            >
              <UserAvatar name={participant.name} />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className={cn("truncate text-sm", conversation.unread && "font-semibold")}>
                    {participant.name}
                  </span>
                  {last && <RelativeTime iso={last.createdAt} className="shrink-0 text-xs text-muted-foreground" />}
                </span>
                <span
                  className={cn(
                    "block truncate text-xs text-muted-foreground",
                    conversation.unread && "font-medium text-foreground"
                  )}
                >
                  {last ? last.content : "No messages yet"}
                </span>
              </span>
              {conversation.unread && (
                <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary">
                  <span className="sr-only">Unread</span>
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
