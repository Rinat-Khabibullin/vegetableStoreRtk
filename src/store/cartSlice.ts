import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";
import type { RootState } from "./index";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; delta: number }>
    ) => {
      const { product, delta } = action.payload;
      if (!delta) return;

      const existing = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        const nextQty = existing.quantity + delta;
        if (nextQty <= 0) {
          state.items = state.items.filter(
            (item) => item.product.id !== product.id
          );
        } else {
          existing.quantity = nextQty;
        }
        return;
      }

      if (delta > 0) {
        state.items = [...state.items, { product, quantity: delta }];
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

export default cartSlice.reducer;
