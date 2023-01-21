import { createSlice } from '@reduxjs/toolkit'
import rawData from '../Components/ProductData/rowData';

export const cartReducer = createSlice({


    name: 'cart',
    initialState: {
        [CART_SLICES.PRODUCTS]:rawData(),
        [CART_SLICES.VARIANT_INFO]: {},
        [CART_SLICES.FREEPRODUCTS]: {},
        isCouponApplied : false,
    },
    reducers: {
        addQuantity: (state, action) => {
            let products = action.payload;
            let productId = action.payload.pid;

            const selectedType = state[CART_SLICES.VARIANT_INFO][productId] || {};
            if (!state[CART_SLICES.PRODUCTS][productId]) {
                state[CART_SLICES.PRODUCTS][productId] = {
                    quantity: 0,
                    selectedType: null,
                    sellingPrice: products.sellingPrice || '',
                    productName: products.productName || '',
                    category: products.category || '',
                    brand: products.brand || '',
                    isCombo: products.isCombo || false,
                    mrp: products.mrp || ''

                }
            }
            state[CART_SLICES.PRODUCTS] = {
                ...state[CART_SLICES.PRODUCTS],
                [productId]: {
                    ...state[CART_SLICES.PRODUCTS][productId],
                    quantity: state[CART_SLICES.PRODUCTS][productId].quantity + 1,
                    selectedType: selectedType,
                    sellingPrice: products.sellingPrice || '',
                    productName: products.productName || '',
                    category: products.category || '',
                    brand: products.brand || '',
                    isCombo: products.isCombo || false,
                    mrp: products.mrp || '',
                    productData:products


                }
            }
            state.isCouponApplied = false;
            
            localStorage.setItem(KEYS.CARTDATA, JSON.stringify(state[CART_SLICES.PRODUCTS]));
            cartProductTrigger(productId, state[CART_SLICES.PRODUCTS], EVENTS_NAME.addToCart)

            if (state[CART_SLICES.PRODUCTS][productId].quantity >1) {
                
                productQuantityChange(productId, state[CART_SLICES.PRODUCTS][productId].quantity, state[CART_SLICES.PRODUCTS], EVENTS_NAME.increaseQuantity);
            }
        },
        minusQuantity: (state, action) => {
            
            let products = action.payload;
            let productId = action.payload.pid;
            
            const selectedType = state[CART_SLICES.VARIANT_INFO][productId] || {};
            if (!state[CART_SLICES.PRODUCTS][productId]) {
                state[CART_SLICES.PRODUCTS][productId] = {
                    quantity: 1,
                    selectedType: selectedType
                }
            }
            if (state[CART_SLICES.PRODUCTS][productId].quantity >1) {
            productQuantityChange(productId, state[CART_SLICES.PRODUCTS][productId].quantity, state[CART_SLICES.PRODUCTS], EVENTS_NAME.decreaseQuantity);
            }
            if (state[CART_SLICES.PRODUCTS][productId].quantity >= 1) {
                state[CART_SLICES.PRODUCTS] = {
                    ...state[CART_SLICES.PRODUCTS],
                    [productId]: {
                        ...state[CART_SLICES.PRODUCTS][productId],
                        quantity: state[CART_SLICES.PRODUCTS][productId].quantity - 1,
                        selectedType: selectedType,
                        sellingPrice: products.sellingPrice || '',
                        productName: products.productName || '',
                        category: products.category || '',
                        brand: products.brand || '',
                        isCombo: products.isCombo || false,
                        mrp: products.mrp || '',
                        productData:products


                    }
                }
            } else {
                delete state[CART_SLICES.PRODUCTS][productId];
            }
            cartProductTrigger(productId, state[CART_SLICES.PRODUCTS], EVENTS_NAME.removeFromCart)

            localStorage.setItem(KEYS.CARTDATA, JSON.stringify(state[CART_SLICES.PRODUCTS]));
            state.isCouponApplied = false;
        },
        setVariantInfo: (state, action) => {
            const { variantType, selectedVariant, productId } = action.payload;

            // if item added in cart, then change the variant there as well
            if (state[CART_SLICES.PRODUCTS][productId]) {
                state[CART_SLICES.PRODUCTS][productId].selectedType[variantType] = selectedVariant;
            }

            if (!state[CART_SLICES.VARIANT_INFO][productId]) {
                state[CART_SLICES.VARIANT_INFO][productId] = {
                    [variantType]: selectedVariant
                }
            }
            // 
            state[CART_SLICES.VARIANT_INFO] = {
                ...state[CART_SLICES.VARIANT_INFO],
                [productId]: {
                    ...state[CART_SLICES.VARIANT_INFO][productId],
                    [variantType]: selectedVariant
                }
            }
            localStorage.setItem(KEYS.CARTDATA, JSON.stringify(state[CART_SLICES.PRODUCTS]));
        },
        setFreeProducts: (state, action) => {
            let products = action.payload;
            let productIds = Object.keys(action.payload);
            productIds?.map((productId) => {
                const selectedType = state[CART_SLICES.VARIANT_INFO][productId] || {};
                if (!state[CART_SLICES.PRODUCTS][productId]) {
                    state[CART_SLICES.PRODUCTS][productId] = {
                        quantity: products[productId].quantity,
                        selectedType: null,
                        sellingPrice: products.sellingPrice || '',
                        productName: products.productName || '',
                        category: products.category || '',
                        brand: products.brand || '',
                        isCombo: products.isCombo || false,
                        mrp: products.mrp || '',
                        productData:products

                    }
                } else {
                state[CART_SLICES.PRODUCTS] = {
                    ...state[CART_SLICES.PRODUCTS],
                    [productId]: {
                        ...state[CART_SLICES.PRODUCTS][productId],
                        quantity: state[CART_SLICES.PRODUCTS][productId].quantity + products[productId].quantity,
                        selectedType: selectedType,
                        sellingPrice: products.sellingPrice || '',
                        productName: products.productName || '',
                        category: products.category || '',
                        brand: products.brand || '',
                        isCombo: products.isCombo || false,
                        mrp: products.mrp || '',
                        productData:products


                    }
                }
            }
            })
            localStorage.setItem(KEYS.CARTDATA, JSON.stringify(state[CART_SLICES.PRODUCTS])); 
            state[CART_SLICES.FREEPRODUCTS] = action.payload;
            state.isCouponApplied = true;
        },
        setCartProduct:(state,action)=>{
            state[CART_SLICES.PRODUCTS]={}
        
        },
        setIsCouponApplied : (state, action) => {
            state.isCouponApplied = action.payload;
        },

/*------------------------------------------------------------*/
zeroQuantity:(state,action)=>{
            

            let products = action.payload;

            console.log('Qproducts',products)
            console.log('Qactions',action)
            // console.log('Qstates',current(state))
            console.log('QproductId',action.payload.pid)            

            let productId = action.payload.pid;
            
            const selectedType = state[CART_SLICES.VARIANT_INFO][productId] || {};

            console.log('selectedTYpe',(selectedType))

            // console.log('allproducts',current(state[CART_SLICES.PRODUCTS][productId]))           

            state[CART_SLICES.PRODUCTS] = { 
                ...state[CART_SLICES.PRODUCTS],
                [productId]: {
                    ...state[CART_SLICES.PRODUCTS][productId],
                    quantity:0,
                    selectedType: selectedType,
                    sellingPrice: products.sellingPrice || '',
                    productName: products.productName || '',
                    category: products.category || '',
                    brand: products.brand || '',
                    isCombo: products.isCombo || false,
                    mrp: products.mrp || '',
                    productData:products
                }
            }
            state.isCouponApplied = false;
            
            localStorage.setItem(KEYS.CARTDATA, JSON.stringify(state[CART_SLICES.PRODUCTS]));
        }
    },
})

// Action creators are generated for each case reducer function
export const { addQuantity, minusQuantity, setVariantInfo, setFreeProducts, setCartProduct, setIsCouponApplied,zeroQuantity} = cartReducer.actions

export default cartReducer.reducer
