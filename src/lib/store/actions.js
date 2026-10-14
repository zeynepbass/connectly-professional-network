import { dispatch } from "@/lib/store/store";

function createId(prefix) {
  const random =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  return `${prefix}-${random}`;
}

export function createPost(authorId, content) {
  dispatch({
    type: "posts/create",
    post: {
      id: createId("post"),
      authorId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      likedBy: [],
      comments: [],
    },
  });
}

export function deletePost(postId) {
  dispatch({ type: "posts/delete", postId });
}

export function toggleLike(postId, userId) {
  dispatch({ type: "posts/toggleLike", postId, userId });
}

export function addComment(postId, authorId, content) {
  dispatch({
    type: "posts/addComment",
    postId,
    comment: {
      id: createId("comment"),
      authorId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    },
  });
}

export function updateProfile(userId, changes) {
  dispatch({ type: "profile/update", userId, changes });
}

export function setConnectionStatus(userId, status) {
  dispatch({ type: "connections/set", userId, status });
}

export function toggleSavedJob(jobId) {
  dispatch({ type: "jobs/toggleSaved", jobId });
}

export function applyToJob(jobId, details) {
  dispatch({
    type: "jobs/apply",
    jobId,
    application: { ...details, appliedAt: new Date().toISOString() },
  });
}

export function startConversation(participantId) {
  const conversationId = createId("conversation");
  dispatch({ type: "messages/startConversation", conversationId, participantId });
}

export function sendMessage(conversationId, senderId, content, { markUnread, automated } = {}) {
  dispatch({
    type: "messages/send",
    conversationId,
    markUnread,
    message: {
      id: createId("message"),
      senderId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      ...(automated && { automated: true }),
    },
  });
}

export function markConversationRead(conversationId) {
  dispatch({ type: "messages/markRead", conversationId });
}

export function markNotificationRead(notificationId) {
  dispatch({ type: "notifications/markRead", notificationId });
}

export function markAllNotificationsRead() {
  dispatch({ type: "notifications/markAllRead" });
}
