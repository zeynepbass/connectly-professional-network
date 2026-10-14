import { describe, expect, it } from "vitest";
import { createInitialState } from "@/lib/store/initial-state";
import { reducer } from "@/lib/store/reducer";
import {
  selectConnectionStatus,
  selectCurrentUser,
  selectUnreadConversationCount,
  selectUnreadNotificationCount,
} from "@/lib/store/selectors";

const signedIn = () => reducer(createInitialState(), { type: "auth/signIn", userId: "u1", at: "now" });

describe("reducer", () => {
  it("signs in and out", () => {
    const state = signedIn();
    expect(selectCurrentUser(state).name).toBe("Alex Morgan");
    expect(reducer(state, { type: "auth/signOut" }).session).toBeNull();
  });

  it("toggles likes for a user", () => {
    const state = signedIn();
    const liked = reducer(state, { type: "posts/toggleLike", postId: "p1", userId: "u1" });
    expect(liked.posts.find((post) => post.id === "p1").likedBy).toContain("u1");
    const unliked = reducer(liked, { type: "posts/toggleLike", postId: "p1", userId: "u1" });
    expect(unliked.posts.find((post) => post.id === "p1").likedBy).not.toContain("u1");
  });

  it("creates, comments on and deletes posts", () => {
    const post = { id: "new", authorId: "u1", content: "Hi", createdAt: "x", likedBy: [], comments: [] };
    let state = reducer(signedIn(), { type: "posts/create", post });
    expect(state.posts[0].id).toBe("new");
    state = reducer(state, {
      type: "posts/addComment",
      postId: "new",
      comment: { id: "c", authorId: "u2", content: "Nice", createdAt: "x" },
    });
    expect(state.posts[0].comments).toHaveLength(1);
    state = reducer(state, { type: "posts/delete", postId: "new" });
    expect(state.posts.some((item) => item.id === "new")).toBe(false);
  });

  it("merges profile updates over the base profile", () => {
    const state = reducer(signedIn(), {
      type: "profile/update",
      userId: "u1",
      changes: { headline: "Updated headline" },
    });
    const user = selectCurrentUser(state);
    expect(user.headline).toBe("Updated headline");
    expect(user.name).toBe("Alex Morgan");
  });

  it("updates and clears connection status", () => {
    let state = reducer(signedIn(), { type: "connections/set", userId: "u6", status: "pending" });
    expect(selectConnectionStatus(state, "u6")).toBe("pending");
    state = reducer(state, { type: "connections/set", userId: "u6", status: null });
    expect(selectConnectionStatus(state, "u6")).toBe("none");
  });

  it("toggles saved jobs and records applications", () => {
    let state = reducer(signedIn(), { type: "jobs/toggleSaved", jobId: "j1" });
    expect(state.savedJobIds).toEqual(["j1"]);
    state = reducer(state, { type: "jobs/toggleSaved", jobId: "j1" });
    expect(state.savedJobIds).toEqual([]);
    state = reducer(state, { type: "jobs/apply", jobId: "j2", application: { appliedAt: "x" } });
    expect(state.applications.j2).toEqual({ appliedAt: "x" });
  });

  it("tracks unread conversations and notifications", () => {
    let state = signedIn();
    expect(selectUnreadConversationCount(state)).toBe(2);
    state = reducer(state, { type: "messages/markRead", conversationId: "c1" });
    expect(selectUnreadConversationCount(state)).toBe(1);

    expect(selectUnreadNotificationCount(state)).toBe(3);
    state = reducer(state, { type: "notifications/markRead", notificationId: "n1" });
    expect(selectUnreadNotificationCount(state)).toBe(2);
    state = reducer(state, { type: "notifications/markAllRead" });
    expect(selectUnreadNotificationCount(state)).toBe(0);
  });

  it("does not duplicate conversations with the same participant", () => {
    const state = signedIn();
    const next = reducer(state, { type: "messages/startConversation", conversationId: "x", participantId: "u7" });
    expect(next).toBe(state);
  });

  it("resets demo data but keeps the session", () => {
    let state = reducer(signedIn(), { type: "jobs/toggleSaved", jobId: "j1" });
    state = reducer(state, { type: "demo/reset" });
    expect(state.savedJobIds).toEqual([]);
    expect(state.session.userId).toBe("u1");
  });
});
