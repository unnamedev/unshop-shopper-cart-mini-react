import React from "react"
import {render} from "react-dom"
import {QueryClient, QueryClientProvider, useQuery} from "react-query"
// Styles
import "./index.scss"
// Root
import Root from "./Root"
// Redux
import {Provider} from "react-redux"
import {store} from "./app/store"

const queryClient = new QueryClient()

render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <Root/>
        </Provider>
    </QueryClientProvider>,
    document.getElementById("root")
)
