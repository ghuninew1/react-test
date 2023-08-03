import { Suspense, lazy } from "react"
import "./App.css";
import RouterOut from "./RouterOut";

const Themes = lazy(() => import('./components/Themes'))

export default function App() {
  return (
    <Themes title={""}>
      <RouterOut />
    </Themes>
  )
}
