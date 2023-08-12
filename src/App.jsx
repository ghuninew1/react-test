import {  RouterProvider } from "react-router-dom";
import { Spinner } from "./pages";
import "./App.css";
import {router} from "./router";

export default function App() {


  return <RouterProvider router={router} fallbackElement={<Spinner />} />;
}

