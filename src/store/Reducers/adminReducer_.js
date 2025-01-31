import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue, getState}) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const { data } = await api.post("/category-add", formData,config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_request = createAsyncThunk(
    "seller/get_seller_request",
    async (
      { parPage, page, searchValue },
      { rejectWithValue, fulfillWithValue, getState }
    ) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
        const { data } = await api.get(`/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, config)
        console.log(data)
        return fulfillWithValue(data)
   
       
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  export const get_seller = createAsyncThunk(
    'seller/get_seller',
    async (sellerId, { rejectWithValue, fulfillWithValue, getState}) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
        try {
            const { data } = await api.get(`/get-seller/${sellerId}`, config)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const seller_status_update = createAsyncThunk(
    'seller/seller_status_update',
    async (info, { rejectWithValue, fulfillWithValue, getState}) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
        try {
            const { data } = await api.post(`/seller-status-update`, info, config)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_active_sellers = createAsyncThunk(
  'seller/get_active_sellers',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
          const { data } = await api.get(`/get-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, config)
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)

export const get_deactive_sellers = createAsyncThunk(
  'seller/get_deactive_sellers',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState}) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
          const { data } = await api.get(`/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, config)
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)

export const get_active_traders = createAsyncThunk(
  'admin/get_active_sellers',
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
      try {
          const { data } = await api.get(`/get-traders?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, config)
          console.log("______________________________ :>")
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)


export const adminReducer_ = createSlice({
  name: "administrator",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    traders: [],
    totalTraders: 0,
    trader: {}
  
  },
  reducers: {
    messageClear: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {

    // builder.addCase(get_seller_request.fulfilled, (state, payload) => {
    //   state.loader = false;
    //   state.totalSeller = payload.payload.totalSeller;
    //   state.sellers = payload.payload.sellers;
      
    // });
    // builder.addCase(get_seller.fulfilled, (state, payload) => {
    //   state.loader = false;
    //   state.seller = payload.payload.seller;
    
    // });
    // builder.addCase(seller_status_update.pending, (state, _) => {
    //   state.loader = true;
     
    
    // });
    // builder.addCase(seller_status_update.rejected, (state, payload) => {
    //   state.loader = false;
    //   state.errorMessage = payload.payload.error;
     
    
    // });
    // builder.addCase(seller_status_update.fulfilled, (state, payload) => {
    //   state.loader = false;
    //   state.successMessage = payload.payload.message;
    //   state.seller = payload.payload.seller;
    //   // });
     
    
    // });

    // traders: [],
    // totalTraders: 0,
    // trader: {}
    builder.addCase(get_active_traders.fulfilled, (state, payload) => {
      state.loader = false;
      state.traders = payload.payload.traders
      state.totalTraders = payload.payload.totalTraders
    });
    builder.addCase(get_deactive_sellers.fulfilled, (state, payload) => {
      state.loader = false;
      state.sellers = payload.payload.sellers
      state.totalSeller = payload.payload.totalSeller
    });

    // builder.addCase(get_category.fulfilled, (state, payload) => {
    //   // state.category = payload.payload.message;
    //   state.totalCategory = payload.payload.totalCategory;
    //   state.categories = payload.payload.categories;
    // });
  },
});

export const { messageClear } = adminReducer_.actions;
export default adminReducer_.reducer;
