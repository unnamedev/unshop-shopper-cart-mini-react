import {Link} from "react-router-dom"
import {BiRightArrowAlt} from "react-icons/bi"
import axios from "axios"
import {useQuery} from "react-query"
import {Loader} from "../index"
// Utils
import {API_URL, formatPrice} from "../../utils/helpers"

/**
 * @description 👋🏻 Products
 * @returns {JSX.Element}
 * @constructor
 */
const Products = () => {
    // It's a way to get the data from the API.
    const {isLoading, isError, data: products} = useQuery("products", async () => {
        try {
            const {data} = await axios.get(`${API_URL}`)
            return data
        } catch (e) {
            console.log(e.message)
        }
    })

    // It's a way to prevent the app from crashing.
    if (isLoading) return <Loader/>
    if (isError) return <Loader error/>

    return <div className="grid gap-4 max-w-sm m-auto sm:max-w-full sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
        {products.map(item => <ProductItem key={item.id} product={item}/>)}
    </div>
}


// Exporting the component as a default.
export default Products

/**
 * @description 👋🏻 Product Item
 * @param product
 * @returns {JSX.Element}
 * @constructor
 */
const ProductItem = ({product: {id, name, price, image, description, category}}) =>
    <div className="bg-white dark:bg-gray-800 shadow flex flex-col">
        {/* Image */}
        <Link to={`/products/${id}`} className="shadow rounded-lg">
            <img className="w-full" src={image} alt={name}/>
        </Link>
        {/* Content */}
        <div className="p-3 lg:p-4 flex flex-col h-full gap-2 dark:text-white">
            <p className="text-sm font-semibold text-purple-500 dark:text-sky-500">{category}</p>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm md:text-base">{description}</p>
            <p className="mt-auto flex items-center justify-between">
                <Link to={`/products/${id}`}
                      className="inline-flex font-semibold items-center text-md transition-all text-sky-500 hover:text-purple-500">
                    More <BiRightArrowAlt size={20}/>
                </Link>
                <span className="font-semibold text-lg">{formatPrice(price)}</span>
            </p>
        </div>
    </div>