import { Outlet } from "react-router-dom";
import { NavBar } from "../component/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../component/Footer";
import { useEffect, useState } from "react";
import { UserContext } from "../store/DataContext";
import { currentUser } from "../component/Auth.service";

export default function Root() {
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        currentUser().then((res) => {
            setUser(res?.data);
            setShow(true);
        });
    }, [token]);

    const handleUser = () => {
        setUser(user?.name ? null : user);
    };
    console.log("user", user);

    const links = [
        { to: "/", name: "Home" },
        { to: "/api", name: "Api" },
        { to: "/ping", name: "Ping" },
        { to: "/upload", name: "Upload" },
        { to: "/login", name: "Login", hidden: user?.name === null ? false : true },
        { to: "/register", name: "Register", hidden: user?.name === null ? false : true },
        {
            to: "/profile",
            name: "Profile",
            hidden: user?.name === null ? true : false,
            login: true,
        },
        { to: "#", name: "Logout", hidden: user?.name === null ? true : false, login: true },
    ];

    return (
        <UserContext.Provider value={{ user, handleUser }}>
            <div className="cover-container d-flex w-100 h-100 mx-auto flex-column min-vh-100 ">
                <header> {NavBar(links)}</header>
                <main className="mt-3">
                    <Outlet />
                </main>
                <footer className="mt-auto text-white-50">
                    <Footer />
                </footer>
            </div>
        </UserContext.Provider>
    );
}
