// features/auth.ts
import { BASE_URL, LOG_IN, SIGNUP } from "@/config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { login } from "./user";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (
    userData: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(BASE_URL + SIGNUP, userData);

      const { id, name, email, role } = response.data.data;
      const token = response.data.accessToken;

      thunkAPI.dispatch(
        login({
          id,
          name,
          email,
          role,
          token,
        })
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const loginIn = createAsyncThunk(
  "auth/loginIn",
  async (userData: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL + LOG_IN, userData);

      const { id, name, email, role } = response.data.data;
      const token = response.data.accessToken;

      thunkAPI.dispatch(
        login({
          id,
          name,
          email,
          role,
          token,
        })
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload.msg ||
          action.payload.err ||
          (action.payload.message as string);
      })

      .addCase(loginIn.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(loginIn.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(loginIn.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload.msg ||
          action.payload.err ||
          (action.payload.message as string);
      });
  },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;
