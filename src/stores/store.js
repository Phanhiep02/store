import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/productsSlice";
import { authSlice } from "./slices/authSlice";
import { cartSlice } from "./slices/cartSlice";
import { crudSlice } from "./slices/crudSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    auth: authSlice.reducer,
    carts: cartSlice.reducer,
    users: crudSlice.reducer,
  },
});
