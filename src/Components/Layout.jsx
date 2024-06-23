import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx"
import store from "../Store/store.jsx";
import { Provider } from "react-redux";

function Layout() {
    return (
        <>
            <Provider store={store}>
                <Header />
                <main>
                    <Outlet />
                </main>
            </Provider>

        </>
    )
}

export default Layout