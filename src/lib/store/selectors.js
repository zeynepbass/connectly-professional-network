import { findUserById, getAllUsers } from "@/lib/users";

export function selectUser(state, id) {
  const base = findUserById(id);
  if (!base) return null;
  const overrides = state.profiles[id];
  return overrides ? { ...base, ...overrides } : base;
}

export function selectCurrentUser(state) {
  return state.session ? selectUser(state, state.session.userId) : null;
}

export function selectUsers(state) {
  return getAllUsers().map((user) => selectUser(state, user.id));
}

export function selectFeedPosts(state) {
  return [...state.posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
