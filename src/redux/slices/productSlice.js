import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/config";
import axios from "axios";

const initialState = {
    products : [],
    productDetails : null,
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
    console.log(id)
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
    reducers :{
        clearProducts : (state)=>{
          state.products = [];
          state.loading =false;
          state.error = null
        },
         clearProductDetails : (state)=>{
          state.productDetails = {};
          state.loading =false;
          state.error = null
        },
    },

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
        });

        builder.addCase(getProductDetails.pending,(state)=>{
            state.error = null;
            state.loading = true;
        }).
        addCase(getProductDetails.fulfilled, (state, actions)=>{
            state.loading = false;
            state.productDetails = actions.payload;
        })
        .addCase(getProductDetails.rejected, (state,action)=>{
            state.error = action.payload;
            state.loading = false;
        })

    }
})

export const {clearProducts, clearProductDetails} = productSlice.actions;

export default productSlice.reducer;