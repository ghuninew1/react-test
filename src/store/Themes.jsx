import { useState, useEffect, useCallback, useMemo } from "react";
import { ThemeContext } from "./DataContext";
import PropTypes from "prop-types";

const Themes = ({ children }) => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-bs-theme", theme);
    }, [theme]);

    const handleTheme = useCallback(() => {
        setTheme(theme === "dark" ? "light" : "dark");
    } , [theme]);

    const contextValue = useMemo(() => {
        return {
            theme,
            handleTheme,
        };
    } , [theme, handleTheme]);
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

Themes.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Themes;
