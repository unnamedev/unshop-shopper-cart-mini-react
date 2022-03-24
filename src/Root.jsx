import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
// Components
import {Cart, Footer, Header, Home, Product} from "./components"

/**
 * @description 👋🏻 Root
 * @returns {JSX.Element}
 * @constructor
 */
const Root = () => {
    return <Router>
        <div className="min-h-screen flex flex-col bg-purple-50/20 transition-all dark:bg-gray-900">
            {/* Header */}
            <Header/>

            {/* Main */}
            <main className="s-container flex-grow py-[30px]">
                <Toaster position="bottom-center"/>
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/products/:id" exact element={<Product/>}/>
                    <Route path="/cart" exact element={<Cart/>}/>
                </Routes>
            </main>

            {/* Footer */}
            <Footer/>
        </div>
    </Router>
}

export default Root
