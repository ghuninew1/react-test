import { NavLink, Outlet } from "react-router-dom";
import Navlink from "../../component/Navlinks.js";
import CircularProgressBar from "../../component/CircularProgressBar.jsx";
import { Container } from "react-bootstrap";
const Api = () => {
    const { ApiLink } = Navlink();
    return (
        <Container>
            <ul className="nav nav-tabs my-4">
                {ApiLink &&
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
                <CircularProgressBar selectedValue={8} />

                <CircularProgressBar
                    selectedValue={25}
                    maxValue={50}
                    textColor="#f00"
                    activeStrokeColor="#cc6600"
                    withGradient
                />

                <CircularProgressBar
                    selectedValue={75}
                    maxValue={100}
                    radius={100}
                    activeStrokeColor="#0f4fff"
                    withGradient
                    strokeWidth={25}
                />

                <CircularProgressBar
                    selectedValue={55}
                    maxValue={90}
                    radius={80}
                    activeStrokeColor="#cc6633"
                    withGradient
                    anticlockwise
                    strokeWidth={20}
                />
            </div>
        </Container>
    );
};

export default Api;
