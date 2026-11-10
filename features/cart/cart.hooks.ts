// cart.hooks.ts: how components read and change the cart. Only Client Components call these.

import { useEffect, useSyncExternalStore } from "react";
import type { Product } from "@/features/products/products.types";
import { addItem, decreaseItem, increaseItem, removeItem, removeUnavailable } from "./cart.logic";
import { getCart, SERVER_CART, subscribe, updateCart } from "./cart.store";
import type { Cart } from "./cart.types";

// The cart lines. The component re-renders on every cart change. On the server and in the
// first browser render it is SERVER_CART (empty); then React reads the saved cart.
export function useCart(): Cart {
  return useSyncExternalStore(subscribe, getCart, () => SERVER_CART);
}

// Nothing to listen to: whether the page has loaded in the browser never changes after.
function subscribeToNothing(): () => void {
  return () => {};
}

// false on the server and in the first browser render, true after. A page that shows the cart
// shows "Loading cart…" until then, instead of flashing "Your cart is empty".
export function useCartLoaded(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

export interface CartActions {
  // add and increase take the product, because they check that it is in stock.
  add: (product: Product) => void;
  increase: (product: Product) => void;
  decrease: (productId: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
}

// Made once, outside any component, so they never change: a component that only changes the
// cart (every ProductCard) never re-renders because of them.
const CART_ACTIONS: CartActions = {
  add(product) {
    if (!product.inStock) return;
    updateCart((current) => addItem(current, product.id));
  },
  increase(product) {
    if (!product.inStock) return;
    updateCart((current) => increaseItem(current, product.id));
  },
  decrease: (productId) => updateCart((current) => decreaseItem(current, productId)),
  remove: (productId) => updateCart((current) => removeItem(current, productId)),
  clear: () => updateCart(() => []),
};

// The actions only. Reading them never subscribes to the cart, so it never causes a re-render.
export function useCartActions(): CartActions {
  return CART_ACTIONS;
}

// Deletes the lines whose product the shop no longer sells, once a page has the products
// (the cart page and the checkout summary). Without it, the header would count them and the
// checkout could take an order of $0. The saved cart lives outside React, so changing it
// after the products arrive is an effect.
export function useRemoveUnavailable(products: readonly Product[]): void {
  const cart = useCart();
  useEffect(() => {
    if (removeUnavailable(cart, products) === cart) return;
    updateCart((current) => removeUnavailable(current, products));
  }, [cart, products]);
}
