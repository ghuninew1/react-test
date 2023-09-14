import { useState, useEffect } from "react";
import { ThemeContext } from "./DataContext";

const Themes = ({ children }) => {
    const [theme, setTheme] = useState("dark");
    const [isBg, setIsBg] = useState("#fff");

    useEffect(() => {
        const bodys = document.querySelector("body");
        bodys.style.backgroundColor = isBg;
    }, [isBg]);

    const ClickOn = () => {
        setTheme(theme === "dark" ? "light" : "dark")
        theme === "dark" ? setIsBg("#fff") : setIsBg("#000")
      }

    return (
        <>
            <ThemeContext.Provider value={theme}>
                <section className={theme}>
                    {children}
                </section>
                <button onClick={ClickOn} className={theme}></button>
            </ThemeContext.Provider>
        </>
    );
};

export default Themes;
