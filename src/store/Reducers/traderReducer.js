import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue,getState }) => {
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

      const { data } = await api.post("/category-add", config);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const traderReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    traders: [],
    totalTraders: 0
  
  },
  reducers: {
    messageClear: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(categoryAdd.pending, (state, _) => {
    //   state.loader = true;
    // });
    // builder.addCase(categoryAdd.rejected, (state, payload) => {
    //   state.loader = false;
    //   state.errorMessage = payload.payload.error;
    // });
    // builder.addCase(categoryAdd.fulfilled, (state, payload) => {
    //   state.loader = false;
    //   state.successMessage = payload.payload.message;
    //   state.categories = [...state.categories, payload.payload.category];
    // });

    // builder.addCase(get_category.fulfilled, (state, payload) => {
    //   // state.category = payload.payload.message;
    //   state.totalCategory = payload.payload.totalCategory;
    //   state.categories = payload.payload.categories;
    // });
  },
});

export const { messageClear } = traderReducer.actions;
export default traderReducer.reducer;
