import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {formatPrice} from "../../utils/helpers"
import {decrementItem, deleteItem, incrementItem, resetCart} from "../../features/cart/cartSlice"
import {BiLeftArrowAlt, BiMinus} from "react-icons/bi"
import {IoCloseSharp} from "react-icons/io5"
import {toast} from "react-hot-toast"
import {BsPlus} from "react-icons/bs"

/**
 * @description 👋🏻 Cart
 * @returns {JSX.Element}
 * @constructor
 */
const Cart = () => {
    // A way to get access to the dispatch function.
    const dispatch = useDispatch()
    // A hook that allows us to navigate to a specific route.
    const navigate = useNavigate()
    const {cartItems, cartItemsCount, cartItemsAmount} = useSelector(({cart}) => cart)

    // This is a simple way to redirect user to home page if cart is empty.
    useEffect(() => {
        if (cartItems.length === 0) navigate("/", {replace: true})
    }, [cartItems])

    // This is a simple way to delete item from cart.
    const onDelete = (id) => {
        if (window.confirm("Do you want delete item from cart?")) {
            dispatch(deleteItem(id))
            toast.success(`Item is removed from your cart`)
        }
    }

    // It's a way to delete all items from cart.
    const onClear = () => {
        if (window.confirm("Do you want delete item from cart?")) {
            dispatch(resetCart())
            toast.success(`Items is removed from your cart`)
        }
    }

    return <div className="flex flex-col items-start gap-[20px]">
        {/* Go Back */}
        <Link
            to="/"
            className="flex px-5 py-2.5 font-medium bg-slate-300 hover:bg-slate-400 rounded-sm text-sm transition-all lg:text-md dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            <BiLeftArrowAlt size={20}/>
            Go Back
        </Link>

        <h1 className="text-xl font-semibold lg:text-2xl dark:text-white">MY BAG</h1>

        <div className="grid gap-3 items-start w-full md:grid-cols-3">
            <ul className="w-full shadow gap-4 grid  md:col-span-2">
                {cartItems.map(({id, image, price, amount, qty, name, category}) =>
                    <li
                        key={id}
                        className="bg-white shadow p-3 flex gap-[10px] relative sm:flex-row sm:gap-5 dark:bg-gray-800 dark:text-white"
                    >
                        <img className="max-w-[150px] sm:max-w-[200px] object-cover w-full" src={image} alt={name}/>
                        <div className="flex flex-col items-start gap-1">
                            <p className="font-semibold md:text-lg">{formatPrice(price)}</p>
                            <h3 className="text-lg">{name}</h3>
                            <div className="flex flex-col gap-2">
                                <p><span className="text-sm md:text-lg font-semibold">Category</span>: {category}</p>
                                <div className="sm:flex sm:items-center">
                                    <span className="text-sm md:text-lg font-semibold sm:mr-4">Qty:</span>

                                    <div className="flex gap-2 items-center text-xl">
                                        <button
                                            onClick={() => dispatch(decrementItem(id))}
                                            className="w-[30px] h-[30px] bg-slate-500 flex items-center justify-center rounded bg-red-800 transition-all hover:bg-red-500 text-white">
                                            <BiMinus size={20}/>
                                        </button>
                                        <span className="font-semibold">{qty}</span>
                                        <button
                                            onClick={() => dispatch(incrementItem(id))}
                                            className="w-[30px] h-[30px] bg-slate-500 flex items-center justify-center rounded bg-green-800 transition-all hover:bg-green-500 text-white">
                                            <BsPlus size={20}/>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-lg">
                                    <span
                                        className="text-sm md:text-lg font-semibold">Sub-total</span>: {formatPrice(amount)}
                                </p>
                            </div>
                        </div>

                        <button onClick={() => onDelete(id)}>
                            <IoCloseSharp
                                size={30}
                                className="absolute top-[10px] right-[10px] cursor-pointer hover:text-red-500 transition-all"/>
                        </button>
                    </li>
                )}
            </ul>

            {/* Total */}
            <div className="flex flex-col gap-2 bg-white shadow p-3 dark:bg-gray-800 dark:text-white">
                <h3 className="text-xl font-semibold uppercase pb-2 border-b mb-4 dark:border-b-slate-700">Total</h3>
                <p className="flex items-center justify-between text-lg">
                    <span className="text-sm md:text-lg font-semibold">Total Price:</span> {formatPrice(cartItemsAmount)}
                </p>
                <p className="flex items-center justify-between text-lg">
                    <span className="text-sm md:text-lg font-semibold">Total Items:</span> {cartItemsCount}
                </p>

                <button
                   className="w-full inline-flex items-center justify-center w-full px-6 py-3 text-lg text-white bg-green-500 rounded-md hover:bg-green-400 transition-all mt-auto"
                   data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
                    Checkout
                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"/>
                    </svg>
                </button>

                <button
                    onClick={onClear}
                    className="w-full inline-flex items-center justify-center w-full px-6 py-3 text-lg text-white bg-red-500 rounded-md hover:bg-red-400 transition-all mt-auto"
                >
                    Clear Cart
                </button>

            </div>
        </div>
    </div>
}

export default Cart
