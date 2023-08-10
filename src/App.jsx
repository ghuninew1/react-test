import { Suspense } from "react"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import { Themes,Status,Spinner,NavBar } from "./pages";
import Api from "./components/Api";
import Binancs from "./components/Binanc";
export default function App() {
  
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
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
}

function Root() {
  return (
    <Themes>
      <div className="App">
        <NavBar />
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
    </Themes>
  );
}