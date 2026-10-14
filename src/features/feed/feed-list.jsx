"use client";

import { Newspaper } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PostCard } from "@/features/feed/post-card";
import { useDemoState } from "@/lib/store/hooks";
import { selectFeedPosts } from "@/lib/store/selectors";

export function FeedList() {
  const posts = selectFeedPosts(useDemoState());

  if (posts.length === 0) {
    return (
      <EmptyState
        icon={Newspaper}
        title="Your feed is quiet"
        description="Posts from your network will show up here."
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="sr-only">Recent posts</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
