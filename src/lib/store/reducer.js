import { createInitialState } from "@/lib/store/initial-state";

function updatePost(state, postId, update) {
  return {
    ...state,
    posts: state.posts.map((post) => (post.id === postId ? update(post) : post)),
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case "auth/signIn":
      return { ...state, session: { userId: action.userId, signedInAt: action.at } };
    case "auth/signOut":
      return { ...state, session: null };
    case "demo/reset":
      return { ...createInitialState(), session: state.session };

    case "posts/create":
      return { ...state, posts: [action.post, ...state.posts] };
    case "posts/delete":
      return { ...state, posts: state.posts.filter((post) => post.id !== action.postId) };
    case "posts/toggleLike":
      return updatePost(state, action.postId, (post) => ({
        ...post,
        likedBy: post.likedBy.includes(action.userId)
          ? post.likedBy.filter((id) => id !== action.userId)
          : [...post.likedBy, action.userId],
      }));
    case "posts/addComment":
      return updatePost(state, action.postId, (post) => ({
        ...post,
        comments: [...post.comments, action.comment],
      }));

    case "profile/update":
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [action.userId]: { ...state.profiles[action.userId], ...action.changes },
        },
      };

    default:
      return state;
  }
}
