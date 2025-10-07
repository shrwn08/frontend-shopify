import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../config/config";

const initialState = {
    cart : [],
    error : null,
    loading : false

}

const getCartItems = createAsyncThunk("getCartItems", async(_,{rejectWithValue})=>{
    try {
        const response = await axios.get(`${api}/cart`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});






const cartSlice=createSlice({
    name : "cart",
    initialState,
    reducers : {

    },
    extraReducers :(builder)=>{
        builder.addCase(getCartItems.pending,(state)=>{
            state.error = null;
            state.loading = true;
        })
        .addCase(getCartItems.fulfilled, (state,action)=>{
            state.loading = false;
            state.cart = action.payload;
        })
        .addCase(getCartItems.rejected, (state,action)=>{
            state.error = action.payload;
            state.loading = false;
        })
    }
})

export default cartSlice.reducer;