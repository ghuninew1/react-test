import { NavLink, Outlet } from "react-router-dom";
import Navlink from "../../component/Navlinks"
const Api = () => {
    const { ApiLink } = Navlink();
    return (
        <>
            <ul className="nav nav-tabs my-4">
            {ApiLink.length > 0 &&
                        ApiLink.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                end={link.to === "/" ? true : false}
                                className={"nav-link"}
                            >
                                {link.name && link.name}
                            </NavLink>
                        ))}
            </ul>
            <div>
                <h2 className="text-center">Api</h2>
                <Outlet />
            </div>
        </>
    );
};

export default Api;
