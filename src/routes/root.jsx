import { Outlet } from "react-router-dom";
import { NavBar } from "../component/NavBar";

export default function Root() {
    const links = [
        { to: "/", name: "Home" },
        { to: "/about", name: "About" },
        { to: "/contact", name: "Contact" },
        { to: "/login", name: "Login" },
    ];
    return (
        <main>
            {NavBar(links)}
            <Outlet />
        </main>
    );
}
