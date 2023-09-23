import { Outlet } from "react-router-dom";
import { NavBar } from "../component/NavBar";

export default function Root() {
    const links = [
        { to: "/", name: "Home" },
        { to: "/api", name: "Api" },
        { to: "/signin", name: "Sign In" },
        { to: "/signup", name: "Sign Up" },
    ];
    return (
        <main>
            <header>{NavBar(links)}</header>
            <Outlet />
            <footer className="footer">@2023 GhuniNeW</footer>
        </main>
    );
}
