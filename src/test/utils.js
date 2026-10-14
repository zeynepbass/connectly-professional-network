import { DEMO_USER_ID } from "@/data/users";
import { dispatch } from "@/lib/store/store";

export function resetDemoStore({ signedIn = true } = {}) {
  dispatch({ type: "demo/reset" });
  dispatch({ type: "auth/signOut" });
  if (signedIn) {
    dispatch({ type: "auth/signIn", userId: DEMO_USER_ID, at: new Date().toISOString() });
  }
}
