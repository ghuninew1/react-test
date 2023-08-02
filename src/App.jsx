/* eslint-disable react/prop-types */
// import { useState,useEffect } from "react";
import {createBrowserRouter,RouterProvider,Outlet,} from "react-router-dom";
import {  Suspense, lazy } from "react"
import "./App.css";

const Themes = lazy(() => import('./components/Themes'))
const Spinner = lazy(() => import('./components/Spinner'))
const Binance = lazy(() => import('./components/Binance'))
const NavBar = lazy(() => import('./components/NavBar'))
const AppScript = lazy(() => import('./components/AppScript'))


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
        path: "/studio",
        element: "studio",
      },
      {
        path: "/app",
        element: <AppScript />,
      },
      {
        path: "*",
        element: "Error",
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
}

function Root() {
  return (
    <Themes title={""}>
      <NavBar />
      <div className="App">
        <Binance />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      </div>
    </Themes>
  );
}