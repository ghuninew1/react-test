import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {  Suspense, lazy } from "react"

const Spinner = lazy(() => import('./components/Spinner'))
const Binance = lazy(() => import('./components/Binance'))
const NavBar = lazy(() => import('./components/NavBar'))
const AppScript = lazy(() => import('./components/AppScript'))

export default function RouterOut() {

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
           element: "Home",
        },
      ],
    },
  ]);
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
}

function Root() {
  return (
    <>
      <div className="App">
      <NavBar />
      <Binance />
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}