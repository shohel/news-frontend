import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/css/tailwindbase.scss";
import "react-loading-skeleton/dist/skeleton.css";
import AppRoutes from "./core/AppRoutes";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("newsRoot")).render(
  <React.StrictMode>
    <RouterProvider router={AppRoutes} />
  </React.StrictMode>
);
