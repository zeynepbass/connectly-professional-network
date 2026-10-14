"use client";

import { useSyncExternalStore } from "react";
import { getServerState, getState, subscribe } from "@/lib/store/store";
import { selectCurrentUser } from "@/lib/store/selectors";

export function useDemoState() {
  return useSyncExternalStore(subscribe, getState, getServerState);
}

const noopSubscribe = () => () => {};

export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export function useCurrentUser() {
  return selectCurrentUser(useDemoState());
}
