"use client";

import Link from "next/link";
import { RelativeTime } from "@/components/shared/relative-time";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatCount } from "@/lib/format";
import { useDemoState } from "@/lib/store/hooks";
import { selectUser } from "@/lib/store/selectors";

export function PostCard({ post }) {
  const state = useDemoState();
  const author = selectUser(state, post.authorId);
  if (!author) return null;

  const headingId = `post-${post.id}-author`;

  return (
    <article aria-labelledby={headingId}>
      <Card>
      <CardContent className="space-y-3">
        <header className="flex items-start gap-3">
          <Link href={`/profile/${author.username}`} tabIndex={-1} aria-hidden="true">
            <UserAvatar name={author.name} />
          </Link>
          <div className="min-w-0 flex-1">
            <h3 id={headingId} className="text-sm font-semibold">
              <Link href={`/profile/${author.username}`} className="hover:underline">
                {author.name}
              </Link>
            </h3>
            <p className="truncate text-xs text-muted-foreground">{author.headline}</p>
            <RelativeTime iso={post.createdAt} className="text-xs text-muted-foreground" />
          </div>
        </header>

        <p className="text-sm leading-relaxed whitespace-pre-line">{post.content}</p>

        <p className="flex gap-3 text-xs text-muted-foreground">
          <span>{formatCount(post.likedBy.length, "like")}</span>
          <span>{formatCount(post.comments.length, "comment")}</span>
        </p>
      </CardContent>
      </Card>
    </article>
  );
}
