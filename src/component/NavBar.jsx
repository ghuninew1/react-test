import { Navbar } from "react-bootstrap";
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
        <div className="nav-bar my-2 py-0">
            <Navbar
                expand="md"
                style={style}
                bg="dark"
                variant="dark"
                className={"fixed-top border-bottom"}
            >
                <Navbar.Brand href="#" className="mx-2" onClick={handleThemes}>
                    GNEW
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className={"justify-content-end"}>
                    {links &&
                        links.map((link) => (
                            <Navbar.Text key={link.name} className={"nav-item"}>
                                <NavLink
                                    to={link.to}
                                    end={link.to === "/" ? true : false}
                                    className={"nav-link text-decoration-none mx-2 px-2 py-1 my-1"}
                                >
                                    {link.name}
                                </NavLink>
                            </Navbar.Text>
                        ))}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
