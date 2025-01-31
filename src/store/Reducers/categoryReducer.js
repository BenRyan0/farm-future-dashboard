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


      const { data } = await api.post("/category-add", formData, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryDelete = createAsyncThunk(
  "category/categoryDelete",
  async ({ id }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    console.log("IDDDDDD ---------------------- >")
    console.log(id)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Make DELETE request to your API endpoint
      const { data } = await api.delete(`/category-remove/${id}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const additionalFeaturesAdd = createAsyncThunk(
  "category/additionalFeaturesAdd",
  
  async ({ name, image,description }, { rejectWithValue, fulfillWithValue, getState}) => {
    const {token} = getState().auth
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }


    console.log(name);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);

      const { data } = await api.post("/additional-features-add", formData,config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const additionalFeatureDelete = createAsyncThunk(
  "category/featureDelete",
  async ({ id }, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().auth;
    console.log("IDDDDDD ---------------------- >")
    console.log(id)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Make DELETE request to your API endpoint
      const { data } = await api.delete(`/feature-remove/${id}`, config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const get_category = createAsyncThunk(
  "category/get_category",
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
        `/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        config
      );
      console.log("CATEGORIEs")
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_additionalFeatures = createAsyncThunk(
  "category/additional_feature_get",
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
        `/additional-features-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,config);
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    loader_delete: false,
    categories: [],
    totalCategory: 0,
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
    builder.addCase(categoryAdd.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(categoryAdd.rejected, (state, payload) => {
      state.loader = false;
      state.errorMessage = payload.payload.error;
    });
    builder.addCase(categoryAdd.fulfilled, (state, payload) => {
      state.loader = false;
      state.successMessage = payload.payload.message;
      state.categories = [...state.categories, payload.payload.category];
    });


    builder.addCase(categoryDelete.pending, (state, _) => {
      state.loader_delete = true;
    });
    builder.addCase(categoryDelete.rejected, (state, payload) => {
      state.loader_delete = false;
      state.errorMessage = payload.payload.error;
    });

    builder.addCase(categoryDelete.fulfilled, (state, payload) => {
      state.loader_delete = false;
      state.successMessage = payload.payload.message;
    
      // Only add category if it's not null or undefined
      if (payload.payload.category) {
        state.categories = [...state.categories, payload.payload.category];
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
    
      // Only add category if it's not null or undefined
      if (payload.payload.category) {
        state.additionalFeatures = [...state.additionalFeatures, payload.payload.additionalFeatures];
      }
    });
    

    builder.addCase(get_category.fulfilled, (state, payload) => {
      // state.category = payload.payload.message;
      state.totalCategory = payload.payload.totalCategory;
      state.categories = payload.payload.categories;
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
      state.additionalFeatures = [...state.additionalFeatures, payload.payload.additionalFeature];
    });


    builder.addCase(get_additionalFeatures.fulfilled, (state, payload) => {
      // state.category = payload.payload.message;
      state.totalAdditionalFeatures = payload.payload.totalAdditionalFeatures;
      state.additionalFeatures = payload.payload.additionalFeatures;
    });
  },
});

export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
