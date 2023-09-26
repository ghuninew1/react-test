import { Outlet } from "react-router-dom";
import { NavBar } from "../component/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../component/Footer";

export default function Root() {
    const links = [
        { to: "/", name: "Home" },
        { to: "/api", name: "Api" },
        { to: "/ping", name: "Ping" },
        { to: "/signin", name: "Login" },
        { to: "/signup", name: "Sign Up" },
        { to: "/upload", name: "Upload" },
    ];
    return (
        <main className="d-flex flex-column justify-content-between min-vh-100 h-100 text-center">
            {NavBar(links)}
            <Outlet />
            <Footer />
        </main>
    );
}
