import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const commodityAdd = createAsyncThunk(
  "commodity/commodityAdd",
  async ({ name,
    description,
    category,
    unit,
    image}, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(category)

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("unit", unit);
      formData.append("image", image);
      // formData.append("price", price);

      console.log("NGIIIIIIIIIIIIIII")
      // console.log(price)

      const { data } = await api.post("/commodity-add", formData, config);
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const commodityDelete = createAsyncThunk(
  "commodity/commodityDelete",
  async ({ id }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await api.delete(`/commodity-remove/${id}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const get_commodity = createAsyncThunk(
//   "commodity/get_commodity",
//   async ({ parPage, page, searchValue,week }, { rejectWithValue, fulfillWithValue, getState }) => {
//     const { token } = getState().auth;
//     console.log("SHIIIIIIIIIIIIIIIIIIIIIIT")
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     try {
//       const { data } = await api.get(
//         `/commodity-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}&&week=${week}`,week,
//         config
//       );
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const get_commodity = createAsyncThunk(
  "commodity/get_commodity",
  async ({ parPage, page, searchValue, week }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    console.log("SHIIIIIIIIIIIIIIIIIIIIIIT");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Format the week parameters to be query string values
      const firstDay = encodeURIComponent(week.firstDay);
      const lastDay = encodeURIComponent(week.lastDay);

      const { data } = await api.get(
        `/commodity-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}&&firstDay=${firstDay}&&lastDay=${lastDay}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_commodity1 = createAsyncThunk(
  "commodity/get_commodity1",
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    console.log("SHIIIIIIIIIIIIIIIIIIIIIIT");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {


      const { data } = await api.get(
        `/commodity-get-1?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add Admin Commodity Price
export const adminCommodityPriceAdd = createAsyncThunk(
  "commodity/adminCommodityPriceAdd",
  async ({ commodityId, price, week }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };


    console.log("-----------------------------------------------------------")
    console.log(price)
    console.log(week)
    console.log(commodityId)
    console.log("-----------------------------------------------------------")
    try {
      const { data } = await api.post("/admin-commodity-price-add", { commodityId, price, week }, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Admin Commodity Price
export const adminCommodityPriceDelete = createAsyncThunk(
  "commodity/adminCommodityPriceDelete",
  async ({ id }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await api.delete(`/admin-commodity-price-remove/${id}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Admin Commodity Price
export const getAdminCommodityPrice = createAsyncThunk(
  "commodity/getAdminCommodityPrice",
  async ({ commodityId, week }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await api.get(`/admin-commodity-price-get/${commodityId}?week=${week}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const commodityReducer = createSlice({
  name: "commodity",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    loader_delete: false,
    commodities: [],
    totalCommodity: 0,
    additionalFeatures: [],
    totalAdditionalFeatures: 0,
  },
  reducers: {
    messageClear: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(commodityAdd.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(commodityAdd.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(commodityAdd.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.commodities = [...state.commodities, payload.payload.commodity];
    });

    builder.addCase(commodityDelete.pending, (state, _) => {
      state.loader_delete = true;
    });
    builder.addCase(commodityDelete.rejected, (state, payload) => {
      state.loader_delete = false;
      state.errorMessage = payload.payload.error;
    });

    builder.addCase(commodityDelete.fulfilled, (state, payload) => {
      state.loader_delete = false;
      state.successMessage = payload.payload.message;

      if (payload.payload.commodity) {
        state.commodities = state.commodities.filter(
          (commodity) => commodity.id !== payload.payload.commodity.id
        );
      }
    });


    builder.addCase(get_commodity.pending, (state, payload) => {
     state.loader = true
    });
    builder.addCase(get_commodity.rejected, (state, payload) => {
      state.loader = false
     
    });
    builder.addCase(get_commodity.fulfilled, (state, payload) => {
      state.loader = false
      state.totalCommodity = payload.payload.totalCommodity;
      state.commodities = payload.payload.commodities;
    });
    builder.addCase(get_commodity1.pending, (state, payload) => {
     state.loader = true
    });
    builder.addCase(get_commodity1.rejected, (state, payload) => {
      state.loader = false
     
    });
    builder.addCase(get_commodity1.fulfilled, (state, payload) => {
      state.loader = false
      state.totalCommodity = payload.payload.totalCommodity;
      state.commodities = payload.payload.commodities;
    });





    builder.addCase(adminCommodityPriceAdd.pending, (state, payload) => {
     state.loader = true
    });
    builder.addCase(adminCommodityPriceAdd.rejected, (state, payload) => {
      state.loader = false
      state.errorMessage = payload.payload.error
     
    });
    builder.addCase(adminCommodityPriceAdd.fulfilled, (state, payload) => {
      state.loader = false
      state.successMessage = payload.payload.message
      // state.totalCommodity = payload.payload.totalCommodity;
      // state.commodities = payload.payload.commodities;
    });
  },
});

export const { messageClear } = commodityReducer.actions;
export default commodityReducer.reducer;
