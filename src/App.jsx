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
        element: <Api />,
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

function Api() {
  const testNetworkSpeed = [];
  async function getNetworkDownloadSpeed() {
    const baseUrl = '/test.png';
    const fileSizeInBytes = 500000;
    const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
    console.log(speed);
  }
  async function getNetworkUploadSpeed() {
    const options = {
      hostname: 'www.google.com',
      port: 80,
      path: '/catchers/544b09b4599c1d0200000289',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const fileSizeInBytes = 2000000
    const speed = await testNetworkSpeed.checkUploadSpeed(options, fileSizeInBytes);
    console.log(speed);
  }
  return (
    <>
      <button onClick={getNetworkDownloadSpeed}>Down</button>
      <button onClick={getNetworkUploadSpeed}>Up</button>

    </>
  )
}