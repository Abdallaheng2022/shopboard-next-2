// cart.storage.ts: reads and writes the cart in localStorage. The only file that touches it.
// Browser only: localStorage doesn't exist on the server, so only cart.store.ts calls these,
// and only from the browser.
import type { Cart, CartItem } from "./cart.types";

// The localStorage key the cart is saved under.
export const CART_STORAGE_KEY = "shopboard-cart";

// Checks that a value read from localStorage really looks like a cart line.
function isCartItem(value: unknown): value is CartItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "productId" in value &&
    Number.isInteger(value.productId) &&
    "quantity" in value &&
    Number.isInteger(value.quantity) &&
    typeof value.quantity === "number" &&
    value.quantity >= 1
  );
}

// The saved cart as text, exactly as stored, or null if there is none or storage is blocked.
export function readSavedCartText(): string | null {
  try {
    return localStorage.getItem(CART_STORAGE_KEY);
  } catch (error) {
    console.warn("Couldn't read the saved cart", error);
    return null;
  }
}

// Turns the saved text into a cart. Missing or broken text gives an empty cart, not an error.
export function parseCart(text: string | null): Cart {
  if (text === null) return [];
  try {
    const data: unknown = JSON.parse(text);
    return Array.isArray(data) ? data.filter(isCartItem) : [];
  } catch (error) {
    console.warn("The saved cart is not valid JSON", error);
    return [];
  }
}

// Saves the cart. If storage is full or blocked, the change is lost and the console says so.
export function saveCart(cart: Cart): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn("Couldn't save the cart", error);
  }
}
