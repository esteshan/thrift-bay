import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const newProductApi = createApi({
    reducerPath: "newProduct",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_HOST,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: '/products',
                method: 'POST',
                body: data,
            })
        }),
    }),
});

export const { useCreateProductMutation } = newProductApi
