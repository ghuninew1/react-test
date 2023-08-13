import { createBrowserRouter, Outlet,Navigate } from "react-router-dom";
import { Suspense } from "react"
import { Themes,Status,Spinner,NavBar,Binancs,Api } from "./pages";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: "Home",
        },
        {
          path: "status",
          element: <Status />,
        },
        {
          path: "bn",
          element: <Binancs />,
        },
        {
          path: "api",
          element: <Api />,
        },
        {
          path: "about",
          lazy: ()  => import("./pages/About"),
        },       
      ],
    },
    {
      path: "/404",
      element: "NotFound",
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

function Root() {
    return (
      <Themes>
        <NavBar />
        <div className="App">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </Themes>
    );
}

export  {router};