import { Outlet } from "react-router-dom";
import { NavBar } from "../component/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../component/Footer";
import { useEffect, useState } from "react";
import { UserContext } from "../store/DataContext";

export default function Root() {
    const [tokens, setTokens] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        localStorage.getItem("token") && setTokens(localStorage.getItem("token"));
        // checkToken(token);
    }, []);

    const checkToken = async (token) => {
        const res = await fetch("http://localhost:3001/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        if (data) {
            setUser(data);
        } else {
            setUser(null);
        }
        console.log("data", data);
    };

    const links = [
        { to: "/", name: "Home" },
        { to: "/api", name: "Api" },
        { to: "/ping", name: "Ping" },
        { to: "/signin", name: "Login" },
        { to: "/upload", name: "Upload" },
        { to: "/profile", name: "Profile", hidden: true },
        { to: "#", name: "Logout", hidden: true },
    ];
    // console.log("token", tokens);
    return (
        <UserContext.Provider value={{ tokens, setTokens, user, setUser }}>
            <div className="cover-container d-flex w-100 h-100 mx-auto flex-column min-vh-100 ">
                <header> {NavBar(links)}</header>
                <main className="mt-5" >
                    <Outlet />
                </main>
                <footer className="mt-auto text-white-50">
                    <Footer />
                </footer>
            </div>
        </UserContext.Provider>
    );
}
