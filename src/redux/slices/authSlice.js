import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const token = localStorage.getItem("token");

const initialState = {
  token: token || null,
  user: null,
  loading: false,
  error: null,
  successMessage: null,
  isAuthenticated: !!token,
};

export const registerUser = createAsyncThunk(
  "registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/register`, formData, {
        headers: {
          "content-type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token } = response.data;

      localStorage.setItem("token", token);

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "updateAddress",
  async (address, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/auth/update-address", { address });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const authSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
       state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("token");

      if (token) {
        state.token = token;
        state.isAuthenticated = true;
         axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    },
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage =  typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Registration successful";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || action.payload || "Registration failed";
      });

    //login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.successMessage = typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Login successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string"
            ? action.payload
            : action.payload?.error || action.payload?.message || "Login failed";
      });

      //update address

      builder
      .addCase(updateAddress.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled,(state,action)=>{
        state.loading = false;
        state.user = action.payload.user;
        state.successMessage = typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Address updated successfully";
      })
      .addCase(updateAddress.rejected, (state,action)=>{
        state.loading = false;
        state.error =  typeof action.payload === "string"
            ? action.payload
            : action.payload?.error || action.payload?.message || "Failed to update address";
      })
  },
});

export const { logout, loadUserFromStorage, clearMessages } = authSlice.actions;
export default authSlice.reducer;
