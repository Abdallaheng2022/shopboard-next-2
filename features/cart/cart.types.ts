// cart.types.ts: what the cart looks like.
import type { Product } from "@/features/products/products.types";

// One line in the cart: which product, and how many of it.
export interface CartItem {
  readonly productId: number;
  readonly quantity: number;
}

// The whole cart. readonly: every change makes a NEW cart instead of editing the old one.
export type Cart = readonly CartItem[];

// A cart line with its product, for showing it. Built by getCartLines().
export interface CartLine {
  readonly product: Product;
  readonly quantity: number;
}

// The three buttons on each cart line, in CartRow.
export type CartAction = "increase" | "decrease" | "remove";
