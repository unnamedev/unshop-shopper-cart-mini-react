import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import {CgShoppingBag} from "react-icons/cg"
import {Toggle} from "../index"
// Utils
import {formatPrice} from "../../utils/helpers"

/**
 * @description 👋🏻 Header
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {
    // This is a way to get the state from the store.
    const {cartItems, cartItemsCount, cartItemsAmount} = useSelector(({cart}) => cart)

    return <header className="py-[15px] shadow bg-white sticky top-0 transition-all border-b-2 lg:py-[20px] dark:bg-gray-900 dark:border-b-gray-700">
        <nav className="s-container flex flex-col items-center justify-between gap-2 sm:flex-row">
            {/* Logo */}
            <Link to="/" className="font-semibold flex items-center gap-1 group sm:text-xl dark:text-white">
                Un <CgShoppingBag className="transition-all sm:text-xl group-hover:text-purple-500"/> Shop
            </Link>

            {/* Theme Toggle */}
            <div
                className="rounded-[50%] bg-white hover:text-yellow-500 hover:rotate-90 transition-all sm:absolute sm:left-[50%] sm:translate-l-[-50%] dark:bg-gray-700 dark:text-purple-400 dark:rotate-12 dark:hover:rotate-12">
                <Toggle/>
            </div>

            {/* Cart */}
            <Link to="/cart" className={`${cartItems.length === 0 && "pointer-events-none"} inline-flex overflow-hidden text-white bg-gray-900 rounded group dark:bg-gray-800`}>
                <span
                    className={`${cartItems.length === 0 ? "bg-gray-400" : "bg-purple-500"} px-3.5 py-2 text-white group-hover:bg-purple-600 flex items-center justify-center transition-all`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                </span>
                <span className="pl-4 pr-5 py-2.5 font-medium">
                    ({cartItemsCount}) {" "}
                    {formatPrice(cartItemsAmount)}
                </span>
            </Link>
        </nav>
    </header>
}

export default Header
