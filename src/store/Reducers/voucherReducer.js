import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const voucherAdd = createAsyncThunk(
  "voucher/voucherAdd",
  async ({ code, discount, discountType,voucherEndDate,voucherStartDate, sellerId }, { rejectWithValue, fulfillWithValue, getState}) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const formData = new FormData();
      formData.append("code", code);
      formData.append("discount", discount);
      formData.append("discountType", discountType);
      formData.append("voucherEndDate", voucherEndDate);
      formData.append("voucherStartDate", voucherStartDate);
      formData.append("sellerId", sellerId);
    //   formData.append("image", image);

      const { data } = await api.post("/voucher-add", formData,config);

      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_vouchers = createAsyncThunk(
  "voucher/get_vouchers",
  async (
    { parPage, page,sellerId, searchValue, },
    { rejectWithValue, fulfillWithValue,getState }
  ) => {
    console.log("TAEEEEEEEEEE")
    console.log(sellerId)
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await api.get(
        `/voucher-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}&&sellerId=${sellerId}`,
      config
      );
      console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  } 
);

// export const get_category = createAsyncThunk(
//   "category/get_category",
//   async (
//     { parPage, page, searchValue },
//     { rejectWithValue, fulfillWithValue }
//   ) => {
//     try {
//       const { data } = await api.get(
//         `/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
//         { withCredentials: true }
//       );
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const voucherDelete = createAsyncThunk(
  "voucher/voucherDelete",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;

    console.log("INFO")
    console.log(info)

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Ensure correct content type
      },
    };

    try {
      // Use POST instead of DELETE to allow a request body
      const { data } = await api.post(`/voucher-remove`, info, config);
      console.log("VOUCHER DEL")
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const voucherRemove = createAsyncThunk(
  "voucher/voucherRemove",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;

    console.log("INFO")
    console.log(info)

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Ensure correct content type
      },
    };

    try {
      // Use POST instead of DELETE to allow a request body
      const { data } = await api.post(`/voucher-delete`, info, config);
      console.log("VOUCHER DEL")
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




export const voucherReducer = createSlice({
  name: "voucher",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    vouchers: [],
    totalVouchers: 0,
  },
  reducers: {
    messageClear: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(voucherAdd.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(voucherAdd.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(voucherAdd.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      // state.categories = [...state.categories, payload.payload.category];
    });
    builder.addCase(voucherDelete.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(voucherDelete.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(voucherDelete.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      // state.categories = [...state.categories, payload.payload.category];
    });
    builder.addCase(voucherRemove.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(voucherRemove.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(voucherRemove.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      // state.categories = [...state.categories, payload.payload.category];
    });






    builder.addCase(get_vouchers.fulfilled, (state, payload) => {

      state.totalVouchers = payload.payload.totalVouchers;
      state.vouchers = payload.payload.vouchers;
    });
  },
});

export const { messageClear } = voucherReducer.actions;
export default voucherReducer.reducer;
