// cart.store.ts: the one owner of the cart. A small store outside React, the way Zustand works,
// so the server render and the browser agree (see "State" in AGENTS.md).
// React keeps no copy: components subscribe with useSyncExternalStore (cart.hooks.ts) and read
// the cart from here. Every change goes through updateCart(), with a pure function from
// cart.logic.ts that returns a NEW cart.
import { CART_STORAGE_KEY, parseCart, readSavedCartText, saveCart } from "./cart.storage";
import type { Cart } from "./cart.types";

// The cart during the server render and the first browser render: the server can't read
// localStorage, so both start empty and agree. One constant, so React sees the same value.
export const SERVER_CART: Cart = [];

// null until the first read in the browser. After that, the cart: the only copy.
let cart: Cart | null = null;
const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) listener();
}

// Another tab changed the saved cart: take its version, so every tab shows the same cart.
function handleStorage(event: StorageEvent): void {
  if (event.key !== CART_STORAGE_KEY) return;
  cart = parseCart(event.newValue);
  notify();
}

// For useSyncExternalStore: React calls this to listen, and the returned function to stop.
export function subscribe(listener: () => void): () => void {
  if (listeners.size === 0) window.addEventListener("storage", handleStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", handleStorage);
  };
}

// For useSyncExternalStore, in the browser: the current cart. It reads localStorage once, the
// first time; after that it returns the same object until the cart changes.
export function getCart(): Cart {
  cart ??= parseCart(readSavedCartText());
  return cart;
}

// The only way to change the cart: a pure function gets the current cart and returns a new one.
// The new cart is saved, then every subscribed component re-renders.
export function updateCart(change: (current: Cart) => Cart): void {
  cart = change(getCart());
  saveCart(cart);
  notify();
}
