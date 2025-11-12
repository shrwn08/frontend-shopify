import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/config";
import axios from "axios";

const initialState = {
  products: [],
  filteredProducts: [],
  productDetails: null,
  categories: [],
  error: null,
  loading: false,
  filters: {
    search: "",
    category: "all",
    minPrice: "",
    maxPrice: "",
    sort: "",
  },
};

export const getProducts = createAsyncThunk(
  "getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

function filterProducts(products, filters) {
  let filtered = [...products];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  if (filters.minPrice) {
    filtered = filtered.filter((p) => p.price >= Number(filters.minPrice));
  }
  if (filters.maxPrice) {
    filtered = filtered.filter((p) => p.price <= Number(filters.maxPrice));
  }

  if (filters.sort) {
    switch (filters.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating-desc":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
  }

  return filtered;
}

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.filteredProducts = [];
      state.loading = false;
      state.error = null;
    },
    clearProductDetails: (state) => {
      state.productDetails = {};
      state.loading = false;
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredProducts = filterProducts(state.products, state.filters);
    },
    resetFilters: (state) => {
      state.filters = {
        search: "",
        category: "all",
        minPrice: "",
        maxPrice: "",
        sort: "",
      };
      state.filteredProducts = state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = filterProducts(action.payload, state.filters);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getCategories.pending, (state) => {
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder
      .addCase(getProductDetails.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, actions) => {
        state.loading = false;
        state.productDetails = actions.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearProducts, clearProductDetails, setFilters, resetFilters } =
  productSlice.actions;

export default productSlice.reducer;