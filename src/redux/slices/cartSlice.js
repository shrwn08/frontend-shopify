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

const addingToCart = createAsyncThunk("addingToCart", async(id,{rejectWithValue})=>{
    try {
        const response = await axios.post(`${api}/add_to_cart`);
        return response.data

    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})

const increaseQuantityItem = createAsyncThunk("increaseQuantityItem", async(id,{rejectWithValue})=>{
    try {
        const response = await axios.put(`${api}/increase_quantity`,{id},{
            headers : {
                "Content-Type" : "application/json"
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})

const decreaseQuantityItem = createAsyncThunk("decreaseQuantityItem", async(id,{rejectWithValue})=>{
    try {
        const response = await axios.put(`${api}/decrease_quantity`,{id},{
            headers : {
                "Content-Type" : "application/json"
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})




const cartSlice=createSlice({
    name : "cart",
    initialState,
    reducers : {

    },
    extraReducers :(builder)=>{
        //getCartItems
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
        });
        //addingToCart
        builder.addCase(addingToCart.pending, (state)=>{
            state.loading = true;
                state.error = null;
        })
        .addCase(addingToCart.fulfilled, (state,action)=>{
             state.loading = false;
            state.cart = action.payload;
        })
        .addCase(addingToCart.rejected, (state,action)=>{
            state.error = action.payload;
        })

        //increaseQuantityItem
        builder.addCase(increaseQuantityItem.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(increaseQuantityItem.fulfilled, (state,action)=>{
            state.loading = false;
            state.cart = action.payload;
        })
        .addCase(increaseQuantityItem.rejected, (state,action)=>{
            state.error = action.payload;
            state.loading = false;
        });
           /// decreaseQuantityItem
        builder.addCase(decreaseQuantityItem.pending, (state)=>{
            state.error = null;
            state.loading = true;
        })
        .addCase(decreaseQuantityItem.fulfilled, (state,action)=>{
            state.cart = action.payload;
            state.loading = false;
        })
        .addCase(decreaseQuantityItem.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default cartSlice.reducer;