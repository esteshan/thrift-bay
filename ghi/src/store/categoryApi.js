import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => `/categories`,
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `/categories`,
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useGetCategoryQuery, useCreateCategoryMutation } = categoryApi;
