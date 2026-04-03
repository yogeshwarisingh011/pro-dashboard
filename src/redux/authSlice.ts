import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { name: string } | null;
}
const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ name: string }>) => {
      state.user = action.payload; // Store mein naam save kar lo
    },

    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
