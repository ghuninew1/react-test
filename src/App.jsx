/* eslint-disable react/prop-types */
// import { useState,useEffect } from "react";
import {createBrowserRouter,RouterProvider,Outlet,} from "react-router-dom";
import {  Suspense, lazy } from "react"
import "./App.css";

const Themes = lazy(() => import('./components/Themes'))
const Spinner = lazy(() => import('./components/Spinner'))
const Binance = lazy(() => import('./components/Binance'))
const NavBar = lazy(() => import('./components/NavBar'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
         element: "",
      },
      {
        path: "/studio",
        element: "studio",
      },
      {
        path: "/jobs",
        element: "jobs",
      },
      {
        path: "*",
        element: "error",
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
      <Suspense fallback={<Spinner />}>
        <div className="App">
          <Binance />
          <Outlet />
        </div>
      </Suspense>
    </Themes>
  );
}