/* eslint-disable react/prop-types */
import {  useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";

function Themes({ children,title }) {
  const [theme, setTheme] = useState("light");
  const ClickOn = () => {
    const bodys = document.querySelector('body');
    setTheme(theme === "dark" ? "light" : "dark");
    theme === "dark" ? bodys.style.backgroundColor = "#fff" : bodys.style.backgroundColor = "#000";
  }
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Button onClick={ClickOn}></Button>
        <Panel title={title}>{children}</Panel>
      </ThemeContext.Provider>
    </>
  );
}

const Panel = ({ title, children }) => {
  const theme = useContext(ThemeContext);
  const className = "panel-" + theme;
  return (
    <section className={className}>
      {title && <h1>{title}</h1>}
      {children}
    </section>
  );
}

const Button = ({ children, onClick }) => {
  const theme = useContext(ThemeContext);
  const className = "button-" + theme;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
export default Themes