import { lazy } from "react"

export const Themes = lazy(() => import('../components/Themes'))
export const Spinner = lazy(() => import('../components/Spinner'))
export const Binancs = lazy(() => import('./Binanc'))
export const NavBar = lazy(() => import('../components/NavBar'))
export const Status = lazy(() => import('./Status'))
export const Api = lazy(() => import('./Api'))
