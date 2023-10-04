import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Login from "./pages/login/Login.jsx";
import Api from "./pages/api/Api.jsx";
import Ping from "./pages/ping/Ping.jsx";
import Upload from "./pages/api/Upload.jsx";
import Register from "./pages/login/Register.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/login/Profile.jsx";
import Layout from "./component/Layout.jsx";

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                { path: "/", index: true, element: <Layout>Home</Layout> },
                {
                    path: "/api",
                    element: (
                        <Layout>
                            <Api />
                        </Layout>
                    ),
                },
                {
                    path: "/ping",
                    element: (
                        <Layout>
                            <Ping />
                        </Layout>
                    ),
                },
                {
                    path: "/upload",
                    element: (
                        <Layout>
                            <Upload />
                        </Layout>
                    ),
                },
                {
                    path: "/signin",
                    element: (
                        <Layout login>
                            <Login />
                        </Layout>
                    ),
                },
                {
                    path: "/signup",
                    element: (
                        <Layout login>
                            <Register />
                        </Layout>
                    ),
                },
                {
                    path: "/profile",
                    element: (
                        <Layout>
                            <Profile />
                        </Layout>
                    ),
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
