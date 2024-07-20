import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./features/articles";

export const store = configureStore({
  reducer: {
    articles: articlesSlice,
  },
});
