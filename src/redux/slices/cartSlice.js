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
      return Array.isArray(response.data)
        ? response.data
        : response.data.cartItems;
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

export const updateQuantityItem = createAsyncThunk(
  "updateQuantityItem",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/update_quantity",
        { id, quantity },
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
  async ({ id }, { rejectWithValue }) => {
    try {
       await axiosInstance.delete(`/remove/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const placeOrder = createAsyncThunk("placeOrder", async (_,{rejectWithValue})=>{
   try {
      const response = await axiosInstance.delete(`/orderplaced`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
})
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
    clearCart : (state)=>{
      state.cart = [];
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

    //updateQuantityItem
    builder
      .addCase(updateQuantityItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantityItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = Array.isArray(action.payload)
          ? action.payload
          : state.cart.map((item) =>
              item._id === action.payload._id ? action.payload : item
            );
      })
      .addCase(updateQuantityItem.rejected, (state, action) => {
        state.loading = false;

        state.error = state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.error || "Failed to increase quantity";
      });

    //remove button functionality
    builder
      .addCase(removeProductFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter((item) => item._id !== action.payload);
        state.message = "Item removed from cart";
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error =action.payload?.error || action.payload || "Failed to remove item";
      });

      //place order
      builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
         state.loading = false;
  state.cart = [];
  state.message = action.payload.message;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearCartMessage, clearCartError, localUpdateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
