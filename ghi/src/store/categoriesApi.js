import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "/category",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
