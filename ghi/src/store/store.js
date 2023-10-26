import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productsApi } from "./productsApi";
import { productDetailApi } from "./detailApi";
import { usersApi } from "./userProfileApi";
import { categoryApi } from "./categoryApi";
import { authApi } from "./authApi";
import { checkoutApi } from "./checkoutApi";
import { reviewsApi } from "./reviewsApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [productDetailApi.reducerPath]: productDetailApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      productDetailApi.middleware,
      usersApi.middleware,
      categoryApi.middleware,
      usersApi.middleware,
      checkoutApi.middleware,
      reviewsApi.middleware,
    ),
});

setupListeners(store.dispatch);
