import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_admin_orders = createAsyncThunk(
    'order/get_admin_orders',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState }) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
        try {
            const { data } = await api.get(`/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, config)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const get_seller_orders = createAsyncThunk(
    'order/get_seller_orders',
    async ({ parPage, page, searchValue, sellerId }, { rejectWithValue, fulfillWithValue, getState }) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
        try {
            const { data } = await api.get(`/seller/orders/${sellerId}?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,config)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_admin_order = createAsyncThunk(
    'order/get_admin_order',
    async (orderId, { rejectWithValue, fulfillWithValue, getState}) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
        try {
            const { data } = await api.get(`/admin/order/${orderId}`, config)
            console.log("Asdasda")
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_seller_order = createAsyncThunk(
    'order/get_seller_order',
    async (orderId, { rejectWithValue, fulfillWithValue, getState}) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
        try {
            const { data } = await api.get(`/seller/order/${orderId}`,config)
          
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const admin_order_status_update = createAsyncThunk(
    'order/admin_order_status_update',
    async ({ orderId, info }, { rejectWithValue, fulfillWithValue, getState }) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
        try {
            const { data } = await api.put(`/admin/order-status/update/${orderId}`, info, config)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_order_status_update = createAsyncThunk(
    'order/seller_order_status_update',
    async ({ orderId, info,transaction, id }, { rejectWithValue, fulfillWithValue, getState }) => {
      const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
        try {
            const { data } = await api.put(`/seller/order-status/update/${orderId}`, info,transaction,id,config)
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const orderReducer = createSlice({
    name: 'order',
    initialState: {
        successMessage: '',
        errorMessage: '',
        totalOrder: 0,
        loader: false,
        order: {},
        myOrders: [],
        orders : []
    },
  reducers: {
    messageClear: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
  
    // [get_admin_orders.fulfilled]: (state, { payload }) => {
    //     state.myOrders = payload.orders
    //     state.totalOrder = payload.totalOrder
    // },
    // [get_admin_order.fulfilled]: (state, { payload }) => {
    //     state.order = payload.order
    // },
    // [admin_order_status_update.rejected]: (state, { payload }) => {
    //     state.errorMessage = payload.message
    // },
    // [admin_order_status_update.fulfilled]: (state, { payload }) => {
    //     state.successMessage = payload.message
    // },
    // [get_seller_orders.fulfilled]: (state, { payload }) => {
    //     state.myOrders = payload.orders
    //     state.totalOrder = payload.totalOrder
    // },
    // [get_seller_order.fulfilled]: (state, { payload }) => {
    //     state.order = payload.order
    // },
    // [seller_order_status_update.rejected]: (state, { payload }) => {
    //     state.errorMessage = payload.message
    // },
    // [seller_order_status_update.fulfilled]: (state, { payload }) => {
    //     state.successMessage = payload.message
    // },






    builder.addCase(get_admin_orders.fulfilled, (state, payload) => {
      state.loader = false;
      state.orders = payload.payload.orders;
      state.myOrders = payload.payload.totalSeller;
      state.totalOrder = payload.payload.totalOrder;
      
    });
    builder.addCase(get_admin_order.pending, (state,_) => {
      state.loader = true;
    });
    builder.addCase(get_admin_order.rejected, (state, payload) => {
      state.loader = false;
      // state.order = payload.payload.order; 
    });
    builder.addCase(get_admin_order.fulfilled, (state, payload) => {
      state.loader = false;
      state.order = payload.payload.order; 
    });

    
    builder.addCase(admin_order_status_update.pending, (state, _) => {
      state.loader = true;
      // state.order = payload.payload.order; 
    });
    builder.addCase(admin_order_status_update.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.message; 
    });
    builder.addCase(admin_order_status_update.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message; 
    });

    builder.addCase(get_seller_orders.fulfilled, (state, payload) => {
      state.loader = false; 
      state.myOrders = payload.payload.orders
      state.totalOrder = payload.payload.totalOrder
      // state.successMessage = payload.payload.message; 
    });

    builder.addCase(get_seller_order.fulfilled, (state, payload) => {
      state.loader = false; 
      state.order = payload.payload.order
      
    });


    builder.addCase(seller_order_status_update.pending, (state, _) => {
      state.loader = true; 
      // state.errorMessage = payload.payload.message
      
    });
    builder.addCase(seller_order_status_update.rejected, (state, payload) => {
      state.loader = false; 
      state.errorMessage = payload.payload.message
      
    });
    builder.addCase(seller_order_status_update.fulfilled, (state, payload) => {
      state.loader = false; 
      state.successMessage = payload.payload.message
      
    });

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
    // builder.addCase(get_active_sellers.fulfilled, (state, payload) => {
    //   state.loader = false;
    //   state.sellers = payload.payload.sellers
    //   state.totalSeller = payload.payload.totalSeller
    // });
    // builder.addCase(get_deactive_sellers.fulfilled, (state, payload) => {
    //   state.loader = false;
    //   state.sellers = payload.payload.sellers
    //   state.totalSeller = payload.payload.totalSeller
    // });

  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
