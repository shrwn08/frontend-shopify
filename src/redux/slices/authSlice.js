import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../config/config";


const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const  registerUser = createAsyncThunk("registerUser",async ({rejectWithValue})=>{
   try {
     const response = await axios.post(`${api}/register`,{
        headers : {
            "content-type" : "application/json"
        }
    });
    return response.data;
   } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
   }
});



const authSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: () => {
      console.log("its logout");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action)=>{
        state.loading = false;
        state.data = action.payload;
    })
    .addCase(registerUser.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload
    })
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;

