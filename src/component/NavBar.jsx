import { Navbar, Dropdown, NavItem, ListGroupItem, ButtonGroup } from "react-bootstrap";
import { NavLink, Navigate } from "react-router-dom";
import ScrollListener from "./ScrollListener";
import { useEffect, useState } from "react";
import { UseTheme } from "../store/DataContext";
import Navlinks from "../routes/Navlinks";

export const NavBar = () => {
    const scroll = ScrollListener();
    const [style, setStyle] = useState({});
    const [hidden, setHidden] = useState(true);

    const { toggleTheme } = UseTheme();
    const theme = UseTheme().theme;
    const links = Navlinks();
    const token = localStorage.getItem("token");

    const handleThemes = () => {
        toggleTheme();
    };

    useEffect(() => {
        if (token) {
            setHidden(false);
        } else if (hidden === false) {
            localStorage.removeItem("token");
            <Navigate to="/login" replace={true} />;
        } else {
            setHidden(true);
        }
    }, [token, hidden]);

    useEffect(() => {
        if (scroll.lastY === scroll.y) {
            return;
        }
        if (scroll.y - scroll.lastY > 0) {
            if (scroll.y > 100) {
                setStyle({
                    transform: "translateY(-100%)",
                });
            } else {
                setStyle({
                    transform: "translateY(0%)",
                });
            }
        } else {
            setStyle({
                transform: "translateY(0%)",
            });
        }
    }, [scroll.lastY, scroll.y]);

    return (
        <div style={{ zIndex: 1000 }}>
            <Navbar
                expand="md"
                style={style}
                bg=""
                variant=""
                className={`border-bottom fixed-top ${theme}`}
            >
                <Navbar.Brand href="/" className="mx-2">
                    GNEW
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-2" />
                <Navbar.Collapse className={"justify-content-end mx-2"}>
                    {links &&
                        links
                            .filter(
                                (link) =>
                                    link.hidden !== true &&
                                    link.to !== "/signin" &&
                                    link.to !== "/signup"
                            )
                            .map((link) => (
                                <Navbar.Text key={link.name}>
                                    <NavLink
                                        key={link.name}
                                        to={link.to}
                                        end={link.to === "/" ? true : false}
                                        className={` nav-link  btn btn-sm btn-outline-${theme} mx-2 py-1 px-2`}
                                    >
                                        {link.name && link.name}
                                    </NavLink>
                                </Navbar.Text>
                            ))}
                    <div className="btn-group btn-group-sm ">
                        {links &&
                            links
                                .filter(
                                    (link) =>
                                        link.hidden !== true &&
                                        link.login === true
                                )
                                .map((link) => (
                                    <Navbar.Text key={link.name}>
                                        <NavLink
                                            key={link.name}
                                            to={link.to}
                                            end={link.to === "/" ? true : false}
                                            className={"btn btn-outline-info mx-1 py-1 px-2"}
                                        >
                                            {link.name && link.name}
                                        </NavLink>
                                    </Navbar.Text>
                                ))}
                    </div>
                    <NavItem>
                        <button
                            className={`bg-theme-${theme} rounded-circle btn btn-sm btn-outline-${theme} mx-2 py-1 px-2`}
                            onClick={handleThemes}
                        >
                            <span className={`bg-theme-${theme} rounded-circle `}/>
                        </button>
                    </NavItem>
                    <Dropdown hidden={hidden}>
                        <Dropdown.Toggle variant="" className="rounded-circle">
                            <img
                                src="https://github.com/mdo.png"
                                alt="mdo"
                                width="32"
                                height="32"
                                className="rounded-circle"
                            />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-end text-center w-100">
                            {links &&
                                links
                                    .filter((link) => link.login === true)
                                    .map((link) => (
                                        <NavLink
                                            key={link.name}
                                            to={link.to}
                                            className={"dropdown-item text-decoration-none"}
                                        >
                                            {link.name}
                                        </NavLink>
                                    ))}
                            <Dropdown.Item
                                className={"dropdown-item"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    localStorage.removeItem("token");
                                    <Navigate to="/login" replace={true} />;
                                    window.location.reload();
                                    setHidden(false);
                                }}
                            >
                                <i className="bi bi-box-arrow-right"></i>
                                logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
