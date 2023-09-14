import { Outlet } from "react-router-dom";
// import { useContext } from "react";
// import { DataContext } from "../store/DataContext";
import NavBar from "./NavBar";

export default function Root() {
    // const data = useContext(DataContext);
    return (
            <main >
                <NavBar />
                <Outlet />
            </main>
    );
}
