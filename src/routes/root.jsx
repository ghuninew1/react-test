import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

export default function Root() {
    return (
        <div className="cover-container d-flex w-100 h-100 mx-auto flex-column min-vh-100 ">
            <header>
                <NavBar />
            </header>
            <main className="container mt-5">
                <Outlet />
            </main>
            <footer className="mt-auto text-white-50">
                <Footer />
            </footer>
        </div>
    );
}
