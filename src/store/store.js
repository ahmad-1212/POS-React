// store.js
import { configureStore } from "@reduxjs/toolkit";
import { apiBase } from "../services/apiBase"; // Import your base API
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    [apiBase.reducerPath]: apiBase.reducer,

    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiBase.middleware),
});
