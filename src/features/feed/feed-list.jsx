"use client";

import { Newspaper } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { PostCard } from "@/features/feed/post-card";
import { PostComposer } from "@/features/feed/post-composer";
import { useDemoState } from "@/lib/store/hooks";
import { selectFeedPosts } from "@/lib/store/selectors";

export function FeedList() {
  const posts = selectFeedPosts(useDemoState());

  return (
    <div className="space-y-4">
      <PostComposer />
      <h2 className="sr-only">Recent posts</h2>
      {posts.length === 0 ? (
        <EmptyState
          icon={Newspaper}
          title="Your feed is quiet"
          description="Share your first update or reset the demo data to bring back sample posts."
        />
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
