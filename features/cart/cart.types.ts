// cart.types.ts: what the cart looks like.

// One line in the cart: which product, and how many of it.
export interface CartItem {
  readonly productId: number;
  readonly quantity: number;
}

// The whole cart. readonly: every change makes a NEW cart instead of editing the old one.
export type Cart = readonly CartItem[];

// The three buttons on each cart line, in CartRow.
export type CartAction = "increase" | "decrease" | "remove";
