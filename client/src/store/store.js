import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../slices/apiSlice";
import authReducer from "../slices/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
