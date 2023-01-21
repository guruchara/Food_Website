import {createSlice} from '@reduxjs/toolkit'
import { PRODUCT_LIST_SLICES } from '../constants/productListSlices';


export const productSlice = createSlice({

    name: 'product',
    initialState: {
        [PRODUCT_LIST_SLICES.ALL_PRODUCTS]: [],
        [PRODUCT_LIST_SLICES.ALL_PRODUCT_CATEGORY]: {},
        [PRODUCT_LIST_SLICES.BEST_SELLER_PRODUCTS]:[],
    },
    reducers: {
        setProductData: (state, action) => {
            state[PRODUCT_LIST_SLICES.ALL_PRODUCTS] = [...action.payload];
        }    
    }
})

// Action creators are generated for each case reducer function
export const {setProductData} = productSlice.actions

export default productSlice.reducer
