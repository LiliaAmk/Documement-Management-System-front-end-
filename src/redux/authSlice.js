import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode"; // Use default import, not destructured

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { token } = action.payload;
      state.isAuthenticated = true;
      state.token = token;

      // Decode token to extract email and roles (if available)
      let user = null;
      try {
        const decoded = jwtDecode(token);
        user = {
          email: decoded.sub, // JWT "sub" usually stores the email
          roles: decoded.roles || [],
        };
      } catch (err) {
        // Handle decoding error gracefully
        user = null;
      }
      state.user = user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
