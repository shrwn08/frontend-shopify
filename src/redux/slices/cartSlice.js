import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  cart: [],
  message: "",
  error: null,
  loading: false,
};

export const getCartItems = createAsyncThunk(
  "getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cart");
      // console.log(response.data)
      return Array.isArray(response.data) ? response.data : response.data.cartItems;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addingToCart = createAsyncThunk(
  "addingToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/add_to_cart", {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const increaseQuantityItem = createAsyncThunk(
  "increaseQuantityItem",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/increase_quantity",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const decreaseQuantityItem = createAsyncThunk(
  "decreaseQuantityItem",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/decrease_quantity",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "removeProductFromCart",
  async ({id},{rejectWithValue}) => {
    try {
        const response = await axiosInstance.delete(`/add_to_cart/${id}`)
        return response.data;
    } catch (error) {

        return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartMessage: (state) => {
      state.message = "";
    },
    clearCartError: (state) => {
      state.error = null;
    },
    localUpdateQuantity: (state, action) => {
      const { id, change } = action.payload;
      const item = state.cart.find((i) => i._id === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + change);
      }
    },
  },
  extraReducers: (builder) => {
    //getCartItems
    builder
      .addCase(getCartItems.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.error || "Failed to fetch cart items";
        state.loading = false;
      });
    //addingToCart
    builder
      .addCase(addingToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addingToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(addingToCart.rejected, (state, action) => {
        state.error = action.payload;
      });

    //increaseQuantityItem
    builder
      .addCase(increaseQuantityItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increaseQuantityItem.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data || action.payload;
        state.cart = state.cart.map((item) =>
          item._id === updated._id ? updated : item
        );
      })
      .addCase(increaseQuantityItem.rejected, (state, action) => {
        state.loading = false;

        state.error = state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.error || "Failed to increase quantity";
      });
    /// decreaseQuantityItem
    builder
      .addCase(decreaseQuantityItem.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(decreaseQuantityItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(decreaseQuantityItem.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.error || "Failed to decrease quantity";
      });

      //remove button functionality
      builder.addCase(removeProductFromCart.pending, (state)=>{
            state.loading = true;
            state.error = null;
      })
      .addCase(removeProductFromCart.fulfilled, (state,action)=>{
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeProductFromCart.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  },
});
export const { clearCartMessage, clearCartError, localUpdateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
