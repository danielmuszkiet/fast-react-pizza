import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TCartItem } from "../../types";
import type { RootState } from "../../store";

interface TCart {
  cart: TCartItem[];
}

const initialState: TCart = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TCartItem>) => {
      state.cart.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => {
        return item.pizzaId !== action.payload;
      });
    },
    increaseItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item || item.quantity === 0) return;
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart: (state) => {
      state.cart = initialState.cart;
    },
  },
});

export const selectCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

export const selectTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);

export const selectCurrentQuantityById = (id: number) => (state: RootState) => {
  const quantity =
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
  return quantity;
};

export const selectCart = (state: RootState) => state.cart.cart;

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
