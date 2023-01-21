import {configureStore} from '@reduxjs/toolkit'
import { productSlice } from '../reducers/productsReducer'


export default configureStore({
    reducer: {      
        productsData:productSlice.reducer
    },
})
