import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL;
const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "${backendURL}/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "${backendURL}/api/admin/products/get"
    );

    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${backendURL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `${backendURL}/api/admin/products/delete/${id}`
    );

    return result?.data;
  }
);

export const updateFlatSale = createAsyncThunk(
  "/products/flat-sale",
  async ({ saleTitle, salePercentage }) => {
    const response = await axios.put('${backendURL}/api/admin/products/flat-sale', {
      saleTitle,
      salePercentage,
    });
    return response.data;
  }
);
const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(updateFlatSale.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFlatSale.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = state.productList.map((product) => {
          const salePrice = product.price * (1 - action.payload.salePercentage / 100);
          return {
            ...product,
            salePrice,
            saleTitle: action.payload.saleTitle,
            salePercentage: action.payload.salePercentage,
          };
        });
      })
      .addCase(updateFlatSale.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AdminProductsSlice.reducer;
