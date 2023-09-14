import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./routes/error-page.jsx";
import Themes from "./store/Themes.jsx";

    // const data = useContext(DataContext);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", index: true, element: <App /> },
            { path: "/about", element: "About"},
            { path: "/contact", element: "Contact"},
            { path: "/login", element: "Login"},
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
