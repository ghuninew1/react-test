import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./DataContext";
import PropTypes from "prop-types";

const Themes = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const [isBg, setIsBg] = useState("#fff");
    useEffect(() => {
        const bodys = document.querySelector("body");
        bodys.style.backgroundColor = isBg;
    }, [isBg, theme]);

    const ClickOn = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        theme === "dark" ? setIsBg("#fff") : setIsBg("#000");
    };
    return (
        <ThemeContext.Provider value={theme}>
            <button onClick={ClickOn} className={"dl "+theme}></button>
            <section className={theme}>{children}</section>
        </ThemeContext.Provider>
    );
};

Themes.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Themes;
