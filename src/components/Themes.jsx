import { useContext, useState, useEffect } from "react"
import { ThemeContext } from "./ThemeContext"


function Themes({ children, title }) {
  const [theme, setTheme] = useState('dark');
  const [bg, setBg] = useState('#000');

  useEffect(() => {
    const bodys = document.querySelector('body');
    bodys.style.backgroundColor = bg;
  }, [bg]);
  

  const ClickOn = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    theme === "dark" ? setBg("#fff") : setBg("#000")
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

const Panel = ({ title, children,thm }) => {
  const theme = useContext(ThemeContext)
  const className = thm ? (thm + " " + theme) : (theme)
  return (
    <section className={className}>
      {title && <h1>{title}</h1>}
      {children}
    </section>
  );
}


const Button = ({ children, onClick }) => {
  const theme = useContext(ThemeContext)
  const className = "button-" + theme + " " + theme
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
export default Themes