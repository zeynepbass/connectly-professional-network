import { createInitialState } from "@/lib/store/initial-state";

function updateConversation(state, conversationId, update) {
  return {
    ...state,
    conversations: state.conversations.map((conversation) =>
      conversation.id === conversationId ? update(conversation) : conversation
    ),
  };
}

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

    case "connections/set": {
      const connections = { ...state.connections };
      if (action.status) connections[action.userId] = action.status;
      else delete connections[action.userId];
      return { ...state, connections };
    }

    case "jobs/toggleSaved":
      return {
        ...state,
        savedJobIds: state.savedJobIds.includes(action.jobId)
          ? state.savedJobIds.filter((id) => id !== action.jobId)
          : [...state.savedJobIds, action.jobId],
      };
    case "jobs/apply":
      return {
        ...state,
        applications: { ...state.applications, [action.jobId]: action.application },
      };

    case "messages/startConversation":
      if (state.conversations.some((conversation) => conversation.participantId === action.participantId)) {
        return state;
      }
      return {
        ...state,
        conversations: [
          { id: action.conversationId, participantId: action.participantId, unread: false, messages: [] },
          ...state.conversations,
        ],
      };
    case "messages/send":
      return updateConversation(state, action.conversationId, (conversation) => ({
        ...conversation,
        unread: action.markUnread ?? conversation.unread,
        messages: [...conversation.messages, action.message],
      }));
    case "messages/markRead":
      return updateConversation(state, action.conversationId, (conversation) => ({
        ...conversation,
        unread: false,
      }));

    case "notifications/markRead":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.notificationId ? { ...notification, read: true } : notification
        ),
      };
    case "notifications/markAllRead":
      return {
        ...state,
        notifications: state.notifications.map((notification) => ({ ...notification, read: true })),
      };

    default:
      return state;
  }
}
