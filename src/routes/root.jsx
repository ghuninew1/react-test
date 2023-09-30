import { Outlet } from "react-router-dom";
import { NavBar } from "../component/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../component/Footer";
import { useEffect, useState } from "react";
import { UserContext } from "../store/DataContext";
import axios from "axios";

export default function Root() {
    const [tokens, setTokens] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        localStorage.getItem("token") && setTokens(JSON.parse(localStorage.getItem("token")));
        checkToken();
    }, [tokens]);

    console.log("tokens", tokens);
    console.log("user", user);
    const checkToken = async () => {
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: import.meta.env.VITE_API_URL + "users",
            headers: {
                authtoken: tokens,
            },
        };
        try {
            await axios(config).then((res) => {
                console.log(res.data);
                setUser(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const links = [
        { to: "/", name: "Home" },
        { to: "/api", name: "Api" },
        { to: "/ping", name: "Ping" },
        { to: "/upload", name: "Upload" },
        { to: "/login", name: "Login", hidden: user ? true : false },
        { to: "/register", name: "Register", hidden: user ? true : false },
        { to: "/profile", name: "Profile", hidden: user ? false : false, login: true },
        { to: "#", name: "Logout", hidden: user ? false : false, login: true },
    ];
    // console.log("token", tokens);
    return (
        <UserContext.Provider value={{ tokens, setTokens, user, setUser }}>
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
