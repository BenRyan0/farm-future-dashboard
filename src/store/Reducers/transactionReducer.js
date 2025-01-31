import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_transaction = createAsyncThunk(
  'transaction/add_transaction',
  async (transactionData, { rejectWithValue, fulfillWithValue, getState }) => {
      console.log("Adding transaction...");
      console.log(transactionData);
      const { token } = getState().auth;

      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };

      try {
          // Send transaction data as the body of the POST request
          const { data } = await api.post(`/transaction-add`, transactionData, config);
          console.log("Transaction successful:", data);
          return fulfillWithValue(data);
      } catch (error) {
          console.error("Transaction failed:", error.response.data);
          return rejectWithValue(error.response.data);
      }
  }
);
export const confirmFirstPayment = createAsyncThunk(
  'transaction/confirmFirstPayment',
  async (transactionId, { rejectWithValue, fulfillWithValue, getState }) => {
      const { token } = getState().auth;

      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };

      try {
          // Send transaction data as the body of the POST request
          const { data } = await api.put(`/transaction-confirm-deposit`, transactionId, config);
          console.log("Transaction successful:", data);
          return fulfillWithValue(data);
      } catch (error) {
          console.error("Transaction failed:", error.response.data);
          return rejectWithValue(error.response.data);
      }
  }
);



export const confirmSecondPayment = createAsyncThunk(
  'transaction/confirmSecondPayment',
  async (transactionId, { rejectWithValue, fulfillWithValue, getState }) => {
    console.log("SHIIIT")
      const { token } = getState().auth;

      const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      };

      try {
          // Send transaction data as the body of the POST request
          const { data } = await api.put(`/transaction-confirm-full-payment`, transactionId, config);
          console.log("Transaction successful:", data);
          return fulfillWithValue(data);
      } catch (error) {
          console.error("Transaction failed:", error.response.data);
          return rejectWithValue(error.response.data);
      }
  }
);

export const get_transaction_by_deal = createAsyncThunk(
  'transaction/get_transaction_by_deal',
  async (dealId, { rejectWithValue, fulfillWithValue, getState}) => {
    console.log("-------------------------- >>")
    console.log(dealId)
      const {token} = getState().auth
  const config = {
    headers : {
      Authorization: `Bearer ${token}`
    }
  }

      try {
        console.log("GET _______________________________ <")
          const { data } = await api.get(`/transaction-get/${dealId}`,config)
          console.log("GET _______________________________ <")
          console.log(data)
          return fulfillWithValue(data)
      } catch (error) {
          return rejectWithValue(error.response.data)
      }
  }
)

export const DeliveryHandoffProofAdd = createAsyncThunk(
  "transaction/DeliveryHandoffProofAdd",
  async ({image,transactionId }, { rejectWithValue, fulfillWithValue,getState}) => {

  const {token} = getState().auth
  const config = {
    headers : {
      Authorization: `Bearer ${token}`
    }
  }
    try {  
     const formData = new FormData();
      formData.append("image", image);
      formData.append("transactionId",transactionId);
     

      const { data } = await api.post("/delivery-handoff-proof-add", formData,config);
      console.log("____________________________________ >")
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



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
      const { data } = await api.get(
        `/voucher-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
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

export const transactionReducer = createSlice({
  name: "transaction",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    vouchers: [],
    totalVouchers: 0,
    transaction: {},
    currentTransactions: {},
    proof1: {},
    proof2: {},
    Step1loader : false
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

    builder.addCase(get_vouchers.fulfilled, (state, payload) => {
      // state.category = payload.payload.message;
      state.totalVouchers = payload.payload.totalVouchers;
      state.vouchers = payload.payload.vouchers;
    });





    builder.addCase(add_transaction.pending, (state, payload) => {
      // state.errorMessage = payload.payload.error;
      state.loader = true
      state.Step1loader = true
    });

    builder.addCase(add_transaction.rejected, (state, payload) => {
      state.loader = false
      state.Step1loader = false
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(add_transaction.fulfilled, (state, payload) => {
      state.Step1loader = false
      state.loader = false
      state.successMessage = payload.payload.message;
      state.transaction = payload.payload.transaction;
      window.location.reload();
    });
    builder.addCase(get_transaction_by_deal.pending, (state, payload) => {
      state.loader = true

    });
    builder.addCase(get_transaction_by_deal.rejected, (state, payload) => {
      state.loader = false

    });
    builder.addCase(get_transaction_by_deal.fulfilled, (state, payload) => {
      state.loader = false
      state.successMessage = payload.payload.message;
      state.currentTransactions = payload.payload.transactions;
      state.proof1 = payload.payload.proofs[0];
      state.proof2 = payload.payload.proof2;

    });
  },
});

export const { messageClear } = transactionReducer.actions;
export default transactionReducer.reducer;
