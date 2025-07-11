import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TCartItem } from "../../types";

interface TCart {
  cart: TCartItem[];
}

const initialState: TCart = {
  cart: [
    {
      pizzaId: 123,
      name: "Funghi",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
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

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
