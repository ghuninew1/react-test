import { NavLink } from "react-router-dom";

const NavBar = () => {
  const links = [
    { to: "/", name: "Home" },
    { to: "/about", name: "About" },
    { to: "/contact", name: "Contact" },
    { to: "/login", name: "Login" },
];
  return (
    <nav>
      {links.map((link, idx) => (
          <NavLink key={idx} to={link.to} end={link.to==="/" ? true : false}>
              {link.name}
          </NavLink>
      ))}
    </nav>
  )
}

export default NavBar