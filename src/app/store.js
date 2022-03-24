import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "../features/cart/cartSlice"

/* Creating a store with the reducer we just created. */
export const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
})