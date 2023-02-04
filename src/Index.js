import React from "react";
import ReactDOM from "react-dom/client";
import "../assets/css/tailwindbase.scss";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./core/App";

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.createRoot(document.getElementById("newsRoot")).render(
        <App />
    );
});