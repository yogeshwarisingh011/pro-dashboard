import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1. Shuruat mein user kaisa dikhega? (Khali)
interface AuthState {
  user: { name: string } | null;
}

const initialState: AuthState = {
  user: null,
};

// 2. Slice Banana (Hamara Manager)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Ye hai Login ka function
    loginSuccess: (state, action: PayloadAction<{ name: string }>) => {
      state.user = action.payload; // Store mein naam save kar lo
    },
    // Ye hai Logout ka function
    logout: (state) => {
      state.user = null; // Store se naam hata do
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
