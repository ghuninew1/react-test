import { Outlet } from "react-router-dom";
// import { useContext } from "react";
// import { DataContext } from "../store/DataContext";
import NavBar from "./NavBar";

export default function Root() {
    // const data = useContext(DataContext);
    const links = [
        { to: "/", name: "Home" },
        { to: "/about", name: "About" },
        { to: "/contact", name: "Contact" },
        { to: "/login", name: "Login" },
    ];
    return (
            <main >
                <NavBar links={links} />
                <Outlet />
            </main>
    );
}
