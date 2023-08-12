import { createBrowserRouter, Outlet } from "react-router-dom";
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
        {
          path: "dashboard",
          async lazy() {
            let { DashbordLayout } = await import("./pages/Dashboard");
            return { Component: DashbordLayout };
          },
          children: [
            {
              index: true,
              async lazy() {
                let { DashboardIndex } = await import("./pages/Dashboard");
                return { Component: DashboardIndex };
              },
            },
            {
              path: "messages",
              async lazy() {
                let { dashboardMessagesLoader, DashboardMessages } = await import("./pages/Dashboard");
                return {
                  loader: dashboardMessagesLoader,
                  Component: DashboardMessages, 
                  };
              },
            },
          ],
        },
        {
          path: "*",
          element: "Errorr!!!!!",
        },
      ],
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