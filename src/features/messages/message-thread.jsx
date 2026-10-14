"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { RelativeTime } from "@/components/shared/relative-time";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AUTO_REPLY_DELAY_MS, pickAutoReply } from "@/features/messages/auto-replies";
import { sendMessage } from "@/lib/store/actions";
import { cn } from "@/lib/utils";
import { MESSAGE_MAX_LENGTH, validateText } from "@/lib/validation";

export function MessageThread({ conversation, participant, currentUserId, onBack }) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState(null);
  const endRef = useRef(null);
  const messageCount = conversation.messages.length;

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messageCount]);

  function submit() {
    const validationError = validateText(draft, { label: "Message", max: MESSAGE_MAX_LENGTH });
    if (validationError) {
      setError(validationError);
      return;
    }
    sendMessage(conversation.id, currentUserId, draft);
    setDraft("");
    setError(null);

    const reply = pickAutoReply(messageCount);
    setTimeout(() => {
      sendMessage(conversation.id, participant.id, reply, { markUnread: true, automated: true });
    }, AUTO_REPLY_DELAY_MS);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <section aria-labelledby="thread-heading" className="flex h-full min-h-0 flex-col">
      <header className="flex items-center gap-3 border-b px-4 py-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onBack} aria-label="Back to conversations">
          <ArrowLeft aria-hidden="true" />
        </Button>
        <UserAvatar name={participant.name} size="sm" />
        <div className="min-w-0">
          <h2 id="thread-heading" className="truncate text-sm font-semibold">
            <Link href={`/profile/${participant.username}`} className="hover:underline">
              {participant.name}
            </Link>
          </h2>
          <p className="truncate text-xs text-muted-foreground">{participant.headline}</p>
        </div>
      </header>

      <div
        role="log"
        aria-live="polite"
        aria-label={`Messages with ${participant.name}`}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        <ol className="space-y-3">
          {conversation.messages.length === 0 && (
            <li className="py-8 text-center text-sm text-muted-foreground">
              Start the conversation with {participant.name.split(" ")[0]}.
            </li>
          )}
          {conversation.messages.map((message) => {
            const mine = message.senderId === currentUserId;
            return (
              <li key={message.id} className={cn("flex flex-col gap-1", mine ? "items-end" : "items-start")}>
                <p
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm break-words whitespace-pre-line",
                    mine ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md bg-muted"
                  )}
                >
                  <span className="sr-only">{mine ? "You" : participant.name}: </span>
                  {message.content}
                </p>
                <span className="text-[11px] text-muted-foreground">
                  {message.automated && "Automated demo reply · "}
                  <RelativeTime iso={message.createdAt} />
                </span>
              </li>
            );
          })}
        </ol>
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        noValidate
        className="space-y-1 border-t p-3"
      >
        <div className="flex items-end gap-2">
          <label htmlFor="message-draft" className="sr-only">
            Write a message
          </label>
          <Textarea
            id="message-draft"
            rows={1}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              if (error) setError(null);
            }}
            onKeyDown={handleKeyDown}
            maxLength={MESSAGE_MAX_LENGTH}
            placeholder="Write a message…"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "message-error" : "message-hint"}
            className="max-h-32 min-h-10 resize-none"
          />
          <Button type="submit" size="icon" className="size-10" disabled={!draft.trim()} aria-label="Send message">
            <Send aria-hidden="true" />
          </Button>
        </div>
        {error ? (
          <p id="message-error" className="text-sm text-destructive">
            {error}
          </p>
        ) : (
          <p id="message-hint" className="text-[11px] text-muted-foreground">
            Enter to send, Shift + Enter for a new line.
          </p>
        )}
      </form>
    </section>
  );
}
