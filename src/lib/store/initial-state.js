import { initialConnections } from "@/data/connections";
import { posts } from "@/data/posts";
import { minutesAgoToIso } from "@/lib/format";

export const STORE_VERSION = 1;

export function createInitialState(now = Date.now()) {
  return {
    version: STORE_VERSION,
    session: null,
    profiles: {},
    connections: { ...initialConnections },
    posts: posts.map(({ minutesAgo, comments, ...post }) => ({
      ...post,
      createdAt: minutesAgoToIso(minutesAgo, now),
      comments: comments.map(({ minutesAgo: commentMinutes, ...comment }) => ({
        ...comment,
        createdAt: minutesAgoToIso(commentMinutes, now),
      })),
    })),
  };
}
