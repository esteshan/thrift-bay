import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checkoutApi = createApi({
    reducerPath: "checkout",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getCheckout: builder.query({
            query: () => `/checkout`,
        }),
        createCheckout: builder.mutation({
            query: (data) => ({
                url: `/checkout`,
                method: "post",
                body: data,
            })
        })
    })
})

export const { useGetCheckoutQuery, useCreateCheckoutMutation } = checkoutApi;
