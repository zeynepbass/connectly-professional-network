import { createInitialState } from "@/lib/store/initial-state";

export function reducer(state, action) {
  switch (action.type) {
    case "auth/signIn":
      return { ...state, session: { userId: action.userId, signedInAt: action.at } };
    case "auth/signOut":
      return { ...state, session: null };
    case "demo/reset":
      return { ...createInitialState(), session: state.session };
    default:
      return state;
  }
}
