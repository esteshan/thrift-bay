import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from "./productsApi";
import { productDetailApi } from './detailApi';
import { usersApi } from "./userProfileApi";

export const store = configureStore({
reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [productDetailApi.reducerPath]: productDetailApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
    productsApi.middleware,
    productDetailApi.middleware,
    usersApi.middleware
  ),
});

setupListeners(store.dispatch);
