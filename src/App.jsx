import { Suspense } from "react"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import { Themes,Status,Spinner,NavBar } from "./pages";

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
          path: "/status",
          element: <Status />,
        },
        {
          path: "/bn",
          element: 'Home',
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