import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.carts.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.carts.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.carts = state.carts.filter((item) => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.carts.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.carts = [];
    },
  },
});
export const selectTotalPrice = (state) => {
  return state.carts.carts.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
