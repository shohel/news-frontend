import React from "react";
import Home from "./Pages/Home";
import ErrorPage from "./Elements/ErrorPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Preferences from "./Pages/Preferences";

import {
    createBrowserRouter,
} from "react-router-dom";


const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
    {
        path: "preferences",
        element: <Preferences />,
    },
]);

export default AppRoutes;