import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Login from "./pages/login/Login.jsx";
import About from "./pages/about/About.jsx";
import Ping from "./pages/ping/Ping.jsx";
import Upload from "./pages/api/Upload.jsx";
import Register from "./pages/login/Register.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/login/Profile.jsx";
import Layout from "./component/Layout.jsx";
import Api from "./pages/api/index.jsx";
import AboutDet from "./pages/about/AboutDet.jsx";

AboutDet;

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/",
                    element: (
                        <Layout>
                            <h1>Home</h1>
                        </Layout>
                    ),
                },
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
                    path: "/profile",
                    element: (
                        <Layout>
                            <Profile />
                        </Layout>
                    ),
                },
                {
                    path: "/about",
                    element: (
                        <Layout>
                            <About />
                        </Layout>
                    ),
                },
                {
                    path: "/about/det",
                    element: (
                        <Layout>
                            <AboutDet />
                        </Layout>
                    ),
                },
                { path: "/signin", element: <Login /> },
                { path: "/signup", element: <Register /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
