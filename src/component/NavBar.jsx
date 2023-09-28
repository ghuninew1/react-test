import { Navbar, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ScrollListener from "./ScrollListener";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../store/DataContext";

export const NavBar = (links) => {
    const scroll = ScrollListener();
    const [style, setStyle] = useState({});
    const contextValue = useContext(ThemeContext);

    const handleThemes = () => {
        contextValue.handleTheme();
    };

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
        <div style={{ zIndex: 9999 }}>
            <Navbar
                expand="md"
                style={style}
                bg=""
                variant=""
                className="border-bottom fixed-top"
            >
                <Navbar.Brand href="#" className="mx-2" onClick={handleThemes}>
                    GNEW
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-2" />
                <Navbar.Collapse className={"justify-content-end mx-2"}>
                    {links &&
                        links
                            .filter((link) => link.hidden !== true)
                            .map((link) => (
                                <Navbar.Text key={link.name}>
                                    <NavLink
                                        to={link.to}
                                        end={link.to === "/" ? true : false}
                                        className="nav-link text-decoration-none mx-2 px-2 py-1"
                                    >
                                        {link.name && link.name}
                                    </NavLink>
                                </Navbar.Text>
                            ))}
                    <Dropdown hidden={false}>
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
                                    .filter((link) => link.hidden === true)
                                    .map((link) => (
                                        <NavLink
                                            key={link.name}
                                            to={link.to}
                                            className={"dropdown-item my-1"}
                                        >
                                            {link.name}
                                        </NavLink>
                                    ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
