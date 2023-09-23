import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Themes from "./store/Themes.jsx";
import Login from "./pages/login/Login.jsx";
import Api from "./pages/api/Api.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", index: true, element: <App /> },
            { path: "/api", element: <Api />},
            { path: "/signin", element: <Login />},
            { path: "/signup", element: <Login />},
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Themes>
            <RouterProvider router={router} />
        </Themes>
    </React.StrictMode>
);
