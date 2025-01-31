import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const commodityAdd = createAsyncThunk(
  "commodity/commodityAdd",
  async ({ name, image, price}, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("price", price);

      console.log("NGIIIIIIIIIIIIIII")
      console.log(price)

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

export const additionalFeaturesAdd = createAsyncThunk(
  "commodity/additionalFeaturesAdd",
  async ({ name, image, description }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);

      const { data } = await api.post("/additional-features-add", formData, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const additionalFeatureDelete = createAsyncThunk(
  "commodity/featureDelete",
  async ({ id }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await api.delete(`/feature-remove/${id}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_commodity = createAsyncThunk(
  "commodity/get_commodity",
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await api.get(
        `/commodity-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_additionalFeatures = createAsyncThunk(
  "commodity/additional_feature_get",
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await api.get(
        `/additional-features-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        config
      );
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

    builder.addCase(additionalFeatureDelete.pending, (state, _) => {
      state.loader_delete = true;
    });
    builder.addCase(additionalFeatureDelete.rejected, (state, payload) => {
      state.loader_delete = false;
      state.errorMessage = payload.payload.error;
    });

    builder.addCase(additionalFeatureDelete.fulfilled, (state, payload) => {
      state.loader_delete = false;
      state.successMessage = payload.payload.message;

      if (payload.payload.additionalFeature) {
        state.additionalFeatures = state.additionalFeatures.filter(
          (feature) => feature.id !== payload.payload.additionalFeature.id
        );
      }
    });

    builder.addCase(get_commodity.fulfilled, (state, payload) => {
      state.totalCommodity = payload.payload.totalCommodity;
      state.commodities = payload.payload.commodities;
    });

    builder.addCase(additionalFeaturesAdd.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(additionalFeaturesAdd.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(additionalFeaturesAdd.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.additionalFeatures = [
        ...state.additionalFeatures,
        payload.payload.additionalFeature,
      ];
    });

    builder.addCase(get_additionalFeatures.fulfilled, (state, payload) => {
      state.totalAdditionalFeatures = payload.payload.totalAdditionalFeatures;
      state.additionalFeatures = payload.payload.additionalFeatures;
    });
  },
});

export const { messageClear } = commodityReducer.actions;
export default commodityReducer.reducer;
