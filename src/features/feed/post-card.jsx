"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, ThumbsUp, Trash2 } from "lucide-react";
import { RelativeTime } from "@/components/shared/relative-time";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CommentSection } from "@/features/feed/comment-section";
import { formatCount } from "@/lib/format";
import { deletePost, toggleLike } from "@/lib/store/actions";
import { useDemoState } from "@/lib/store/hooks";
import { selectUser } from "@/lib/store/selectors";
import { cn } from "@/lib/utils";

export function PostCard({ post }) {
  const state = useDemoState();
  const [showComments, setShowComments] = useState(false);
  const [focusComment, setFocusComment] = useState(false);
  const commentInputRef = useRef(null);
  const author = selectUser(state, post.authorId);
  const currentUserId = state.session?.userId;

  useEffect(() => {
    if (showComments && focusComment) commentInputRef.current?.focus();
  }, [showComments, focusComment]);

  if (!author) return null;

  const headingId = `post-${post.id}-author`;
  const liked = post.likedBy.includes(currentUserId);
  const isOwnPost = post.authorId === currentUserId;

  function handleCommentToggle() {
    setFocusComment(!showComments);
    setShowComments((open) => !open);
  }

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
            {isOwnPost && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deletePost(post.id)}
                aria-label="Delete post"
              >
                <Trash2 aria-hidden="true" />
              </Button>
            )}
          </header>

          <p className="text-sm leading-relaxed break-words whitespace-pre-line">{post.content}</p>

          <p className="flex gap-3 text-xs text-muted-foreground">
            <span>{formatCount(post.likedBy.length, "like")}</span>
            <span>{formatCount(post.comments.length, "comment")}</span>
          </p>

          <div className="flex gap-1 border-t pt-2">
            <Button
              variant="ghost"
              className={cn("flex-1", liked && "text-primary")}
              aria-pressed={liked}
              onClick={() => toggleLike(post.id, currentUserId)}
            >
              <ThumbsUp className={cn(liked && "fill-current")} aria-hidden="true" />
              {liked ? "Liked" : "Like"}
            </Button>
            <Button
              variant="ghost"
              className="flex-1"
              aria-expanded={showComments}
              onClick={handleCommentToggle}
            >
              <MessageCircle aria-hidden="true" /> Comment
            </Button>
          </div>

          {showComments && <CommentSection post={post} inputRef={commentInputRef} />}
        </CardContent>
      </Card>
    </article>
  );
}
