import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const dummy = import.meta.env.VITE_SERVER_API;
const initialState = {
  productsList: [],
  product: [],
  categories: [],
  status: "ide",
  totalPage: 0,
  searchKeyword: "",
  selectedCategory: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productsList = action.payload.products.map((product) => ({
        ...product,
        quantity: 1,
      }));
      state.totalPage = action.payload.total;
      state.status = "success";
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(getProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = { ...action.payload, quantity: 1 };

      state.status = "success";
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.status = "error";
    });
    // categories
    builder.addCase(getCategories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.status = "success";
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const { searchProduct, setCategory } = productsSlice.actions;
export const useSelectorAllProduct = (state) => state.products.productsList;
export const getProducts = createAsyncThunk(
  "get/getProducts",
  async ({ query = "", category = "", skip = 0 } = {}) => {
    try {
      let queryString = `?limit=6&skip=${skip}`;
      if (query) {
        queryString = `/search?q=${query}&limit=6&skip=${skip}`;
      }
      if (category) {
        queryString = `/category/${category}?limit=6&skip=${skip}`;
      }
      const response = await axios.get(`${dummy}/products${queryString}`);
      // console.log(response);

      return response.data;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
);
export const getProduct = createAsyncThunk("get/getProduct", async (id) => {
  try {
    const response = await axios.get(`${dummy}/products/${id}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.log("error", error);
    return false;
  }
});
export const getCategories = createAsyncThunk("get/getCategories", async () => {
  try {
    const response = await axios.get(`${dummy}/products/category-list`);

    return response.data;
  } catch (error) {
    console.log("error", error);
    return false;
  }
});
