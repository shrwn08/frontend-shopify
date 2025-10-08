import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../config/config";

const token = localStorage.getItem("token");

const initialState = {
  token : token || null,
  loading: false,
  error: null,
  successMessage : null,
  isAuthenticated : !!token,
};

export const registerUser = createAsyncThunk(
  "registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/auth/register`, formData, {
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

export const loginUser = createAsyncThunk("loginUser", async (formData,{rejectWithValue})=>{
    try {
        const response = await axios.post(`${api}/auth/login`,formData,{
            headers : {
                "Content-Type" : "application/json"
            }
        });

        const {token} = response.data;

        localStorage.setItem("token",token);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message); 
    }
})

const authSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    loadUserFromStorage : (state)=>{
      const token = localStorage.getItem("token");
     
      if(token ){
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      //login user
      builder.addCase(loginUser.pending, (state)=>{
        state.loading = true;
        state.error = null;
        
      })
      .addCase(loginUser.fulfilled,(state,action)=>{
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.successMessage = action.payload.message;
      })
      .addCase(loginUser.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout,loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
