import { createInitialState, STORE_VERSION } from "@/lib/store/initial-state";
import { reducer } from "@/lib/store/reducer";

const STORAGE_KEY = "connectly:demo-state";

const serverState = createInitialState();
let state = null;
const listeners = new Set();

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.version === STORE_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

function writeStorage(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    return;
  }
}

function ensureLoaded() {
  if (state === null) {
    state = { ...createInitialState(), ...readStorage() };
  }
  return state;
}

export function getState() {
  return typeof window === "undefined" ? serverState : ensureLoaded();
}

export function getServerState() {
  return serverState;
}

export function dispatch(action) {
  state = reducer(ensureLoaded(), action);
  writeStorage(state);
  listeners.forEach((listener) => listener());
}

function handleStorage(event) {
  if (event.key !== STORAGE_KEY) return;
  state = { ...createInitialState(), ...readStorage() };
  listeners.forEach((listener) => listener());
}

export function subscribe(listener) {
  if (listeners.size === 0) window.addEventListener("storage", handleStorage);
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", handleStorage);
  };
}
