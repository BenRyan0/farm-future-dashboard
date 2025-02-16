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

      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_commodities = createAsyncThunk(
  "commodity/get_seller_commodities",
  async ({ parPage, page, searchValue, week, sellerId }, { rejectWithValue, fulfillWithValue, getState }) => {
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
        `/commodity-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}&&firstDay=${firstDay}&&lastDay=${lastDay}&&sellerId=${sellerId}`,
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

export const get_commodities_seller = createAsyncThunk(
  "commodity/get_commodities_seller",
  async ({ parPage, page, searchValue,sellerId }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    console.log("SHIIIIIIIIIIIIIIIIIIIIIIT");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await api.get(
        `/commodity-get-seller?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}&&sellerId=${sellerId}`,
        config
      );
      console.log("------------------------------------------>commodity-seller")
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const commodityAddToSellerListing = createAsyncThunk(
  "commodity/commodityAddToSellerListing",
  async ({ sellerId, commodityId }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await api.post(`/commodity-add-seller-listing/${sellerId}/${commodityId}`, config);
      console.log("TAEEEEEEEEEEEEEEEEE")
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSellerCommodities = createAsyncThunk(
  "commodity/getSellerCommodities",
  async ({ page, searchValue, parPage, sellerId }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth; // Retrieve the token from the auth state

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the headers
      },
    };

    // Building the query string for pagination and search
    const queryParams = new URLSearchParams({
      page: page.toString(),
      parPage: parPage.toString(),
      searchValue: searchValue || '', // If no search value, use empty string
    }).toString();

    try {
      // Make the API call to fetch seller commodities
      const { data } = await api.get(`/seller/${sellerId}/commodities?${queryParams}`, config);

      console.log("COMMODITIES:", data);
      return fulfillWithValue(data); // Return the data if the request is successful
    } catch (error) {
      // Handle errors and return the error response
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const get_commodity_seller = createAsyncThunk(
//   "commodity/get_commodity_seller",
//   async ({ parPage, page, searchValue, id }, { rejectWithValue, fulfillWithValue, getState }) => {
//     const { token } = getState().auth;
//     console.log("SHIIIIIIIIIIIIIIIIIIIIIIT");

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     try {


//       const { data } = await api.get(
//         `/commodity-get-seller?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}&&id=${id}`,
//         config
//       );
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const removeCommodityFromSellerListing = createAsyncThunk(
  "commodity/removeCommodityFromSellerListing",
  async ({ sellerId, commodityId }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await api.delete(`/seller/${sellerId}/commodity/${commodityId}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
    sellerCommodities: [],
    totalCommodities : 0
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


    builder.addCase(commodityAddToSellerListing.pending, (state) => {
      state.loader_delete = true;
    });
    
    builder.addCase(commodityAddToSellerListing.rejected, (state, payload) => {
      state.loader_delete = false;
      state.errorMessage = payload.payload.error;
    });
    
    builder.addCase(commodityAddToSellerListing.fulfilled, (state, payload) => {
      state.loader_delete = false;
      state.successMessage = payload.payload.message;
    
      // Trigger the getSellerCommodities action to fetch the updated list
      const { sellerId } = payload.meta.arg; // Extract sellerId from the action arguments
      getSellerCommodities({ sellerId });
    });
    
    
    builder.addCase(getSellerCommodities.pending, (state) => {
      state.loader = true; // Set loader to true when the request is pending
    });
    
    builder.addCase(getSellerCommodities.rejected, (state, action) => {
      state.loader = false; // Set loader to false on request failure
      state.error = action.payload || "Failed to fetch seller commodities"; // Capture error
    });
    
    builder.addCase(getSellerCommodities.fulfilled, (state, action) => {
      state.loader = false; // Set loader to false on request success
      state.sellerCommodities = action.payload.commodities; // Populate the seller's commodities
      state.totalCommodities = action.payload.totalCommodities || action.payload.commodities.length; // Capture total count
    });
    
    builder.addCase(get_commodities_seller.pending, (state) => {
      state.loader = true;
    });
    
    builder.addCase(get_commodities_seller.rejected, (state, payload) => {
      state.loader = false;
      state.error = payload.payload || "Failed to fetch commodities";
    });
    
    builder.addCase(get_commodities_seller.fulfilled, (state, payload) => {
      state.loader = false;
      state.totalCommodity = payload.payload.totalCommodities;
      state.commodities = payload.payload.commodities;
    });
    

    builder.addCase(removeCommodityFromSellerListing.pending, (state) => {
      state.loader_delete = true; // Show loader during request
    });
    
    builder.addCase(removeCommodityFromSellerListing.rejected, (state, payload) => {
      state.loader_delete = false; // Hide loader on failure
      state.errorMessage = payload.payload || "Failed to remove commodity";
    });
    
    builder.addCase(removeCommodityFromSellerListing.fulfilled, (state, payload) => {
      state.loader_delete = false; // Hide loader on success
      state.successMessage = payload.payload.message;
    
      const { commodityId } = payload.meta.arg; // Extract the commodityId from the action arguments
    
      // Ensure we remove the commodity from sellerCommodities state
      state.sellerCommodities = state.sellerCommodities.filter(
        (item) => item._id !== commodityId // Ensure you're matching the correct field
      );
    
      // Adjust the totalCommodities count if needed
      state.totalCommodities = state.sellerCommodities.length;
    });
    


    builder.addCase(get_seller_commodities.pending, (state, payload) => {
      state.loader = true
     });
     builder.addCase(get_seller_commodities.rejected, (state, payload) => {
       state.loader = false
      
     });
     builder.addCase(get_seller_commodities.fulfilled, (state, payload) => {
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
