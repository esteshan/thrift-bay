import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const categoriesApi = createApi({
    reducerPath: "categories",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
        credentials: "include"
    }),
    endpoints: (builder) => ({
    getCategory: builder.query({
        query: () => "/categories",
        }),
    }),
});

export const { useGetCategoriesQuery } = categoriesApi;
