import './NavBar.css'
// import Logopng from '../img/Logopng.png'
import {Link, NavLink, useLocation} from 'react-router-dom'
import { useState } from 'react';

export default function NavBar() {
  const location = useLocation();
  const {pathname} = location;
  const [boolean, setBoolean] = useState(true);

  const splitLocation = pathname.split("/");
  const classN = (name) => splitLocation[1] === name ? "active" : ""

  return (
    <>
      <nav className="navbar">
        {/* <div className="logo-png">
        <Link to={"/"}><img src={Logopng} alt='logo-png' /></Link>
        </div> */}
          <ul className="nav-links">
            <input type="checkbox" id="checkbox_toggle" />
            <label htmlFor="checkbox_toggle" className={boolean ? "hamburger" : "hamburger opened"} onClick={() => setBoolean(!boolean)}>
              <svg width="40" height="40" viewBox="0 0 100 100">
                <path className="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                <path className="line line2" d="M 20,50 H 80" />
                <path className="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
              </svg>
            </label>
            <div className="menu" >
              <li className={classN("")}><NavLink style={{textDecoration: 'none'}} end to="/">Home</NavLink></li>
              <li className={classN("studio")}><NavLink style={{textDecoration: 'none'}} to="/studio" >Studio</NavLink></li>
              <li className={classN("jobs")}><NavLink style={{textDecoration: 'none'}} to="/jobs">Jobs</NavLink></li>
            </div>
          </ul>
      </nav>
    </>
  );
}
