"use client";

import { useId, useState } from "react";
import { Send } from "lucide-react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/store/actions";
import { useCurrentUser } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";
import { POST_MAX_LENGTH, validateText } from "@/lib/validation";

export function PostComposer() {
  const user = useCurrentUser();
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const id = useId();

  if (!user) return null;

  const remaining = POST_MAX_LENGTH - content.length;

  function handleSubmit(event) {
    event.preventDefault();
    const validationError = validateText(content, { label: "Post", max: POST_MAX_LENGTH });
    if (validationError) {
      setError(validationError);
      return;
    }
    createPost(user.id, content);
    setContent("");
    setError(null);
    setStatus("Your post was published.");
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate className="flex gap-3">
          <UserAvatar name={user.name} className="hidden sm:flex" />
          <div className="flex-1 space-y-2">
            <label htmlFor={`${id}-content`} className="sr-only">
              Share an update
            </label>
            <Textarea
              id={`${id}-content`}
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
                if (error) setError(null);
                if (status) setStatus("");
              }}
              placeholder="Share an update, idea or win with your network"
              rows={3}
              maxLength={POST_MAX_LENGTH}
              aria-invalid={error ? true : undefined}
              aria-describedby={`${id}-count${error ? ` ${id}-error` : ""}`}
              className="min-h-20 resize-y"
            />
            {error && (
              <p id={`${id}-error`} className="text-sm text-destructive">
                {error}
              </p>
            )}
            <div className="flex items-center justify-between gap-3">
              <p
                id={`${id}-count`}
                className={cn("text-xs text-muted-foreground", remaining < 50 && "text-destructive")}
              >
                {remaining} characters left
              </p>
              <Button type="submit" disabled={!content.trim()}>
                <Send aria-hidden="true" /> Post
              </Button>
            </div>
            <p role="status" className="sr-only">
              {status}
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
