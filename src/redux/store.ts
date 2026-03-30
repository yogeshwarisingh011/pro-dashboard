import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    // 👈 Abhi ye khali hai, kal hum yahan 'auth' daalenge
    auth: authReducer,
  },
});

// Ye do lines TypeScript ke liye hain (Standard Practice)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
