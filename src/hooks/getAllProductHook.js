import axios from "axios"
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setProductData } from "../../reducers/productsReducer";

const useAllProductsData = function () {

const dispatch = useDispatch();

    return useCallback(
        
        
        async () => {
            try {
                const x = await axios.get('https://dummyjson.com/products/')

                console.log("new all product data", x)
                dispatch(setProductData(x))

            }
            catch (error) {

            }       
        }         
    )
}

export default useAllProductsData;