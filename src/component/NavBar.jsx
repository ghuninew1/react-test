import { NavLink } from "react-router-dom";

export const NavBar = (links) => {
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