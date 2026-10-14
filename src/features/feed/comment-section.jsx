"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { RelativeTime } from "@/components/shared/relative-time";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addComment } from "@/lib/store/actions";
import { useDemoState } from "@/lib/store/hooks";
import { selectUser } from "@/lib/store/selectors";
import { COMMENT_MAX_LENGTH, validateText } from "@/lib/validation";

export function CommentSection({ post, inputRef }) {
  const state = useDemoState();
  const currentUser = selectUser(state, state.session?.userId);
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const id = useId();

  function handleSubmit(event) {
    event.preventDefault();
    const validationError = validateText(value, { label: "Comment", max: COMMENT_MAX_LENGTH });
    if (validationError) {
      setError(validationError);
      return;
    }
    addComment(post.id, currentUser.id, value);
    setValue("");
    setError(null);
  }

  return (
    <div className="space-y-3 border-t pt-3">
      {currentUser && (
        <form onSubmit={handleSubmit} noValidate className="flex items-start gap-2">
          <UserAvatar name={currentUser.name} size="sm" />
          <div className="flex-1 space-y-1">
            <label htmlFor={`${id}-comment`} className="sr-only">
              Add a comment
            </label>
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                id={`${id}-comment`}
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  if (error) setError(null);
                }}
                placeholder="Add a comment"
                maxLength={COMMENT_MAX_LENGTH}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className="h-9"
              />
              <Button type="submit" variant="secondary" className="h-9" disabled={!value.trim()}>
                Reply
              </Button>
            </div>
            {error && (
              <p id={`${id}-error`} className="text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        </form>
      )}

      {post.comments.length > 0 && (
        <ul className="space-y-3" aria-label="Comments">
          {post.comments.map((comment) => {
            const author = selectUser(state, comment.authorId);
            if (!author) return null;
            return (
              <li key={comment.id} className="flex gap-2">
                <UserAvatar name={author.name} size="sm" />
                <div className="min-w-0 flex-1 rounded-lg bg-muted px-3 py-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <Link
                      href={`/profile/${author.username}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {author.name}
                    </Link>
                    <RelativeTime iso={comment.createdAt} className="text-xs text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">{author.title}</p>
                  <p className="mt-1 text-sm whitespace-pre-line">{comment.content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
