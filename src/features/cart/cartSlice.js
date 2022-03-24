import {createSlice, current} from "@reduxjs/toolkit"
import {createCopy, sumByKey} from "../../utils/helpers"

/* This is the initial state of the products slice. */
const initialState = {
    cartItems: [],
    cartItemsCount: 0,
    cartItemsAmount: 0,
}

/* This is creating a slice of the cart. */
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // RESET CART
        resetCart: (state) => {
            state.cartItems = []
            state.cartItemsCount = 0
            state.cartItemsAmount = 0
        },
        // ADD ITEM
        addItem: (state, {payload}) => {
            /* This is creating a copy of the current state of the cart. */
            const copy = createCopy(current(state).cartItems)
            const items = !copy.some(i => i.id === payload.id) ?
                [...copy, {...payload, qty: 1, amount: payload.price}] :
                copy.map(el => el.id === payload.id ? {...el, qty: el.qty + 1, amount: el.amount + el.price} : el)

            state.cartItems = items
            state.cartItemsCount = sumByKey(items, "qty")
            state.cartItemsAmount = sumByKey(items, "amount")
        },
        // REMOVE ITEM
        removeItem: (state, {payload}) => {
            /* This is creating a copy of the current state of the cart. */
            const copy = createCopy(current(state).cartItems)
            const items = copy.map(el => el.id === payload && el.qty !== 0 ? {
                ...el,
                qty: el.qty - 1,
                amount: el.amount - el.price
            } : el).filter(el => el.qty !== 0)

            state.cartItems = items
            state.cartItemsCount = sumByKey(items, "qty")
            state.cartItemsAmount = sumByKey(items, "amount")
        },
        // DELETE ITEM
        deleteItem: (state, {payload}) => {
            /* This is creating a copy of the current state of the cart. */
            const items = createCopy(current(state).cartItems).filter(el => el.id !== payload)
            state.cartItems = items
            state.cartItemsCount = sumByKey(items, "qty")
            state.cartItemsAmount = sumByKey(items, "amount")
        },
        // INCREMENT ITEM
        incrementItem: (state, {payload}) => {
            /* This is creating a copy of the current state of the cart. */
            const items = createCopy(current(state).cartItems)
                .map(el => el.id === payload ?
                    {...el, qty: el.qty + 1, amount: el.amount + el.price} : el)

            state.cartItems = items
            state.cartItemsCount = sumByKey(items, "qty")
            state.cartItemsAmount = sumByKey(items, "amount")
        },
        // DECREMENT ITEM
        decrementItem: (state, {payload}) => {
            /* This is creating a copy of the current state of the cart. */
            const items = createCopy(current(state).cartItems)
                .map(el => el.id === payload ? {
                    ...el, qty: el.qty - 1 !== 0 ? el.qty - 1 : 1,
                    amount: el.amount - el.price !== 0 ? el.amount - el.price : el.price
                } : el)

            state.cartItems = items
            state.cartItemsCount = sumByKey(items, "qty")
            state.cartItemsAmount = sumByKey(items, "amount")
        },
    }
})

/* This is creating a slice of the cart. */
export const {resetCart, addItem, removeItem, deleteItem, incrementItem, decrementItem} = cartSlice.actions
/* This is creating a slice of the cart. */
export default cartSlice.reducer