import { initialConnections } from "@/data/connections";
import { conversations } from "@/data/conversations";
import { notifications } from "@/data/notifications";
import { posts } from "@/data/posts";
import { minutesAgoToIso } from "@/lib/format";

export const STORE_VERSION = 1;

export function createInitialState(now = Date.now()) {
  return {
    version: STORE_VERSION,
    session: null,
    profiles: {},
    connections: { ...initialConnections },
    savedJobIds: [],
    applications: {},
    conversations: conversations.map(({ messages, ...conversation }) => ({
      ...conversation,
      messages: messages.map(({ minutesAgo, ...message }) => ({
        ...message,
        createdAt: minutesAgoToIso(minutesAgo, now),
      })),
    })),
    notifications: notifications.map(({ minutesAgo, ...notification }) => ({
      ...notification,
      createdAt: minutesAgoToIso(minutesAgo, now),
    })),
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
