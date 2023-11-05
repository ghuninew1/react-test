import { useEffect, useState } from "react";
import ScrollListener from "./ScrollListener";
import PropTypes from "prop-types";

const UseScroll = ({ children, sec = 0.7, ty = -100 }) => {
    const scroll = ScrollListener();
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (scroll.lastY === scroll.y) {
            return;
        }
        if (scroll.y - scroll.lastY > 0) {
            if (scroll.y > 100) {
                setStyle({
                    transform: `translateY(${ty}%)`,
                    transition: `transform ${sec}s ease-in-out`,
                });
            } else {
                setStyle({
                    transform: "translateY(0%)",
                    transition: `transform ${sec}s ease-in-out`,
                });
            }
        } else {
            setStyle({
                transform: "translateY(0%)",
                transition: `transform ${sec}s ease-in-out`,
            });
        }
    }, [scroll.lastY, scroll.y, sec, ty]);

    return <div style={{ ...style }}>{children}</div>;
};

UseScroll.propTypes = {
    children: PropTypes.node.isRequired,
    sec: PropTypes.number,
    ty: PropTypes.number,
};
export default UseScroll;
