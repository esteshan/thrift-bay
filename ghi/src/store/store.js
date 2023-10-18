import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from "./productsApi";
import { productDetailApi } from './detailApi';

export const store = configureStore({
reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [productDetailApi.reducerPath]: productDetailApi.reducer,
    },
    middleware: getDefaultMiddleware=>
    getDefaultMiddleware().concat(
    productsApi.middleware,
    productDetailApi.middleware
    ),
});

setupListeners(store.dispatch);
