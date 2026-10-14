"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { DemoBadge } from "@/components/shared/demo-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Card } from "@/components/ui/card";
import { ConversationList } from "@/features/messages/conversation-list";
import { MessageThread } from "@/features/messages/message-thread";
import { markConversationRead, startConversation } from "@/lib/store/actions";
import { useDemoState } from "@/lib/store/hooks";
import { selectConversations, selectUser } from "@/lib/store/selectors";
import { cn } from "@/lib/utils";

export function MessagesView({ initialParticipantId }) {
  const state = useDemoState();
  const currentUserId = state.session?.userId;
  const [selectedId, setSelectedId] = useState(initialParticipantId);

  const items = selectConversations(state)
    .map((conversation) => ({ conversation, participant: selectUser(state, conversation.participantId) }))
    .filter((item) => item.participant);
  const selected = items.find((item) => item.participant.id === selectedId) ?? null;
  const missingConversation = Boolean(selectedId) && !selected && selectedId !== currentUserId;

  useEffect(() => {
    if (missingConversation && selectUser(state, selectedId)) startConversation(selectedId);
  }, [missingConversation, selectedId, state]);

  const selectedConversationId = selected?.conversation.id;
  const selectedUnread = selected?.conversation.unread;
  useEffect(() => {
    if (selectedConversationId && selectedUnread) markConversationRead(selectedConversationId);
  }, [selectedConversationId, selectedUnread]);

  const selectedUsername = selected?.participant.username;
  useEffect(() => {
    window.history.replaceState(null, "", selectedUsername ? `/messages?with=${selectedUsername}` : "/messages");
  }, [selectedUsername]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Messaging</h1>
        <DemoBadge label="Automated replies" />
      </div>

      <Card className="grid h-[calc(100dvh-var(--header-height)-12rem)] min-h-[420px] gap-0 py-0 md:h-[calc(100dvh-var(--header-height)-8rem)] md:grid-cols-[300px_1fr]">
        <div className={cn("min-h-0 overflow-y-auto border-r", selected && "hidden md:block")}>
          {items.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">No conversations yet.</p>
          ) : (
            <ConversationList items={items} selectedParticipantId={selectedId} onSelect={setSelectedId} />
          )}
        </div>
        <div className={cn("min-h-0", !selected && "hidden md:block")}>
          {selected ? (
            <MessageThread
              key={selected.conversation.id}
              conversation={selected.conversation}
              participant={selected.participant}
              currentUserId={currentUserId}
              onBack={() => setSelectedId(null)}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6">
              <EmptyState
                icon={MessageSquare}
                title="Select a conversation"
                description="Choose a conversation from the list or message someone from their profile."
                className="border-none bg-transparent"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
