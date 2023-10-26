import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviews",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getReview: builder.query({
      query: () => `/reviews`,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `/reviews`,
        method: "post",
        body: data,
      }),
      invalidates: [{ type: 'getReview' }],
    }),
  }),
});

export const { useGetReviewQuery, useCreateReviewMutation } = reviewsApi;
