import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from "./productsApi";
import { productDetailApi } from './detailApi';
import { usersApi } from "./userProfileApi";
import { categoryApi } from './categoryApi';
import { categoriesApi } from "./categoriesApi";
import { newProductApi } from './newProductApi';

export const store = configureStore({
reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [productDetailApi.reducerPath]: productDetailApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [newProductApi.reducerPath]: newProductApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
    productsApi.middleware,
    productDetailApi.middleware,
    usersApi.middleware,
    categoryApi.middleware,
    usersApi.middleware,
    newProductApi.middleware,
    categoriesApi.middleware
  ),
});

setupListeners(store.dispatch);
