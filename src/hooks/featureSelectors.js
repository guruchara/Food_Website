import {useSelector} from 'react-redux'
import {PRODUCT_LIST_SLICES} from "../constants/productListSlices";


const useAllProducts = () => useSelector(state=>state.productsData[PRODUCT_LIST_SLICES.ALL_PRODUCTS])

const featureSelectors = {
    useAllProducts
};
export default featureSelectors
