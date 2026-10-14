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
