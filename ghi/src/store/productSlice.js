import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'productsold',
    initialState: {},
    reducers: {
    updateProductSoldStatus: (state, action) => {
        const { product_id, sold } = action.payload;
        if (state[product_id]) {
        state[product_id].sold = sold;
        }
    },
    },
});

export const { updateProductSoldStatus } = productSlice.actions;
export default productSlice.reducer;
