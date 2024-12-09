import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string | null | number;
  name?: string | null;
  email?: string | null;
  role?: string | null;
  token?: string | null;
  isAuthenticated?: boolean;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  role: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        id: string | null | number;
        name?: string;
        email?: string;
        role?: string;
        token?: string;
      }>
    ) => {
      const { id, name, email, role, token } = action.payload as UserState;
      state.id = id;
      state.name = name;
      state.email = email;
      state.role = role;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
