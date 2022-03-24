import {Link, useParams} from "react-router-dom"
import {API_URL, formatPrice} from "../../utils/helpers"
import {useDispatch, useSelector} from "react-redux"
import {addItem, removeItem} from "../../features/cart/cartSlice"
import {BiLeftArrowAlt} from "react-icons/bi"
import {MdAddCircleOutline} from "react-icons/md"
import {IoMdRemoveCircleOutline} from "react-icons/io"
import {toast} from "react-hot-toast"
import axios from "axios"
import {Loader} from "../index"
import {useQuery} from "react-query"

/**
 * @description 👋🏻
 * @returns {JSX.Element}
 * @constructor
 */
const Product = () => {
    // It's destructuring the `id` from the `useParams()` hook.
    const {id} = useParams()
    // It's a way to access the `dispatch` function from the `useDispatch()` hook.
    const dispatch = useDispatch()
    // This is a way to get the state from the store.
    const {cartItems} = useSelector(({cart}) => cart)
    // It's a way to get the data from the API.
    const {isLoading, isError, data: product} = useQuery(["product", id], async () => {
        try {
            const {data} = await axios.get(`${API_URL}/${id}`)
            return data
        } catch (e) {
            console.log(e.message)
        }
    })

    // It's a way to prevent the app from crashing.
    if (isLoading) return <Loader/>
    if (isError) return <Loader error/>


    // It's calling the `addItem` action creator from the `cartSlice` and passing the `product` object as an argument.
    const onAdd = () => {
        dispatch(addItem(product))
        toast.success(`${product.name} is added to your cart`)
    }

    // It's calling the `removeItem` action creator from the `cartSlice` and passing the `product.id` as an argument.
    const onRemove = () => {
        dispatch(removeItem(product.id))
        toast.success(`${product.name} is removed from your cart`)
    }

    return <div className="flex flex-col items-start gap-[20px]">
        {/* Go Back */}
        <Link
            to="/"
            className="flex px-5 py-2.5 font-medium bg-slate-300 hover:bg-slate-400 rounded-sm text-sm transition-all lg:text-md dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            <BiLeftArrowAlt size={20}/>
            Go Back
        </Link>

        <div className="py-4 flex flex-col items-start gap-4 lg:grid lg:grid-cols-3 lg:gap-6 dark:text-white">
            {/* Image */}
            <div className="border border-gray-800 shadow">
                <img className="max-w-sm w-full" src={product.image} alt={product.name}/>
            </div>

            {/* Content */}
            <div className="flex flex-col items-start gap-[10px] sm:col-span-2">
                <h2 className="font-semibold text-xl lg:text-2xl">{product.name}</h2>
                <p className="md:text-lg">{product.description_long}</p>
                <p className="md:text-lg">
                    <span className="font-semibold mr-[20px] dark:text-sky-500">Category:</span> {product.category}
                </p>
                <p className="md:text-lg">
                    <span
                        className="font-semibold mr-[20px] dark:text-sky-500">Price:</span> {formatPrice(product.price)}
                </p>

                {/* Control */}
                <div className="mt-[20px] flex flex-col items-start gap-4 w-full sm:flex-row lg:justify-end">
                    <button
                        onClick={onAdd}
                        className="s-btn-detail bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 ">
                        <MdAddCircleOutline size={20}/>
                        Add
                    </button>
                    <button
                        disabled={cartItems.length === 0}
                        onClick={onRemove}
                        className={`${cartItems.length === 0 && "bg-slate-400 hover:bg-slate-400"} s-btn-detail bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600`}>
                        <IoMdRemoveCircleOutline size={20}/>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default Product
