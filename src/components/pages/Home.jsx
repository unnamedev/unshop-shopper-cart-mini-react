import {Products} from "../index"

/**
 * @description 👋🏻 Home
 * @returns {JSX.Element}
 * @constructor
 */
const Home = () => <>
    <div
        className="grid gap-[10px] justify-items-center text-center py-[30px] lg:py-[50px] lg:gap-[20px] dark:text-white">
        <h1 className="font-semibold text-xl lg:text-3xl">UnShop E-Commerce Shopping Cart</h1>
        <p className="lg:text-xl">Everything you wanted to know about your fave fashion brand. And then some.</p>
    </div>

    {/* Products */}
    <Products/>
</>

export default Home
