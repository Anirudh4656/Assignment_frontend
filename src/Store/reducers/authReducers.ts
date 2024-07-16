import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface User {
  email?: string;
  user?: string;
  password?: string;
  role?: string;
  apiKey?: string;
  apiUsage?: number;
  isBlocked?: boolean;
  plan?: string[];
  publicSecret?: string;
  storageUsage?: number;
  username?: string;
  _id?: string;
}
interface AuthState {
  accessToken: string |null;
  refreshToken: string;
  user?: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
const initialState: AuthState = {
  accessToken: localStorage.getItem('token'),
  refreshToken: "",
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{user:object}>) => {
      console.log("user in reducer",action.payload.user)
      state.user = action.payload.user;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {

      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.accessToken)
    },
  },
});

export const { setUser,setTokens, setLoading, setError } = authSlice.actions;

//action creators
export default authSlice.reducer;
