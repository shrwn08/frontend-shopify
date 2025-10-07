import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/config";
import axios from "axios";

const initialState = {
    products : [],
    error : null,
    loading : false
}

export const getProducts = createAsyncThunk("getProducts",async(_,{rejectWithValue})=>{
    try {
        const response = await axios.get(`${api}/products`);

        
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const getProductDetails = createAsyncThunk("getProductDetails",async({id},{rejectWithValue})=>{
    try {
        const response = await axios.get(`${api}/product/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }

})

export const productSlice = createSlice({
    name : "products",
    initialState,
    reducers :{},

    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending, (state)=>{
            state.error = null;
            state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state,action)=>{
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default productSlice.reducer;