import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

// Ye do lines TypeScript ke liye hain (Standard Practice)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
