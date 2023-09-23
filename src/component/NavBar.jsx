import { NavLink } from "react-router-dom";

export const NavBar = (links) => {
    return (
        <nav>
            <div className="navbar">
                <ul>
                    {links.map((link, idx) => (
                        <li key={idx}>
                            <NavLink key={idx} to={link.to} end={link.to === "/" ? true : false}>
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};
