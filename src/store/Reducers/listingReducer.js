import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_listing = createAsyncThunk(
  "listing/add_listing",
  async (listing, { rejectWithValue, fulfillWithValue,getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }


    try {
      console.log("LISTING")
      console.log(listing);
      const { data } = await api.post("/listing-add", listing,config);
      console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const update_listing = createAsyncThunk(
  "listing/update_listing",
  async (listing, { rejectWithValue, fulfillWithValue,getState}) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }


    try {
      console.log(listing);
      const { data } = await api.post("/listing-update", listing,config);
      console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const takedown_listing = createAsyncThunk(
  "listing/takedown_listing",  // Update action name if needed
  async (listingId, { rejectWithValue, fulfillWithValue, getState }) => {
    console.log(listingId)
    const { token } = getState().auth; // Extract token from state
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token in headers for authorization
      },
    };

    try {
      // Send POST request to backend for listing takedown
      const { data } = await api.post("/listing-takedown", { listingId }, config);

      
      console.log(data);  // You can log the response for debugging

      return fulfillWithValue(data);  // Return the data for the fulfilled state
    } catch (error) {
      // Handle errors, send back error response
      return rejectWithValue(error.response.data);  // Reject with error data
    }
  }
);

export const get_listings = createAsyncThunk(
  "listing/get_listings",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue,getState }
  ) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await api.get(
        `/listings-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,config);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_listing = createAsyncThunk(
  "listing/get_listing",
  async (listingId, { rejectWithValue, fulfillWithValue, getState}) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await api.get(`/listing-get/${listingId}`,config);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const listing_image_update = createAsyncThunk(
  "listing/listing_image_update",
  async ({oldImage, newImage, listingId}, { rejectWithValue, fulfillWithValue,getState }) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const formData = new FormData()
      formData.append('oldImage', oldImage)
      formData.append('newImage', newImage)
      formData.append('listingId', listingId)
      const { data } = await api.post("/listing-image-update", formData,config);
      console.log(data);

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const listingReducer = createSlice({
  name: "listing",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    listings: [],
    listing: "",
    totalListings: 0,
  },
  reducers: {
    messageClear: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(add_listing.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(add_listing.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(add_listing.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      // state.categories = [...state.categories, payload.payload.listing];
    });

    builder.addCase(get_listings.fulfilled, (state, payload) => {
      // state.listing = payload.payload.message;
      state.totalListings = payload.payload.totalListings;
      state.listings = payload.payload.listings;
    });
    builder.addCase(get_listing.fulfilled, (state, payload) => {
      state.listing = payload.payload.listing;
    });

    builder.addCase(update_listing.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(update_listing.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(update_listing.fulfilled, (state, payload) => {
      state.loader = false;
      state.listing = payload.payload.listing;
      state.successMessage = payload.payload.message;
    });


    builder.addCase(listing_image_update.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(listing_image_update.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(listing_image_update.fulfilled, (state, payload) => {
      state.loader = false;
      state.listing = payload.payload.listing;
      state.successMessage = payload.payload.message;
    });


    builder.addCase(takedown_listing.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(takedown_listing.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(takedown_listing.fulfilled, (state, payload) => {
      state.loader = false;
      // state.listing = payload.payload.listing;
      state.successMessage = payload.payload.message;
    });
  },
});

export const { messageClear } = listingReducer.actions;
export default listingReducer.reducer;
