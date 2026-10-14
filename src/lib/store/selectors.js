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

export function selectConnectionStatus(state, userId) {
  return state.connections[userId] ?? "none";
}

export function selectUsersByConnection(state, status) {
  return selectUsers(state).filter(
    (user) => user.id !== state.session?.userId && selectConnectionStatus(state, user.id) === status
  );
}

function lastActivity(conversation) {
  return conversation.messages.at(-1)?.createdAt ?? "";
}

export function selectConversations(state) {
  return [...state.conversations].sort((a, b) => lastActivity(b).localeCompare(lastActivity(a)));
}

export function selectUnreadConversationCount(state) {
  return state.conversations.filter((conversation) => conversation.unread).length;
}

export function selectUnreadNotificationCount(state) {
  return state.notifications.filter((notification) => !notification.read).length;
}
