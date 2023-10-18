import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productDetailApi = createApi({
    reducerPath: "product",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
    }),
    endpoints: (builder) => ({
        getProductDetail: builder.query({
            query: (product_id) => `products/${product_id}`,
        }),
    }),
});

export const { useGetProductDetailQuery } = productDetailApi
