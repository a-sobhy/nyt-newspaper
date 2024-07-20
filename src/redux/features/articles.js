import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API, handleError } from "../API/API";

// Articles fetch
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params, thunkAPI) => {
    const apiInstance = API(params);
    try {
      const { data } = await apiInstance.get();
      console.log("Start fetchArticles", data);
      return data;
    } catch (error) {
      handleError(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// initial state
const initialState = {
  count: null,
  articles: null,
  status: null,
  loading: false,
  error: null,
};

// Create articlesSlice
export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.articles = action.payload.results;
        state.count = action.payload.num_results;
        state.error = null;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.status = null;
        state.count = null;
        state.articles = null;
        state.error = action.payload;
      });
  },
});

// export the reducer
export default articlesSlice.reducer;
