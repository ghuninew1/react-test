import React, {useContext} from "react";
import {ThemeContext} from "./ThemeContext";
import "./Layout.css";

const Layout =({txtMain, txtInfo, txtImg, txtNum, toFix=2}) => {
  const theme = useContext(ThemeContext)
  const className = "card-" + theme;
  return (
    <div className={className}>
      <span className="card-main-heading">
        {txtMain && <span className="card-main-msg">{txtMain}</span>}
        {txtNum && <span className="card-main-msg">{Number(txtNum).toFixed(toFix)}</span>}
      </span>
      <span className="card-info">
        {txtImg && <img src={txtImg} alt="" className="txtimg"/>}
      </span>
      {txtInfo && <span className="card-info-msg">{txtInfo}</span>}
    </div>
  );
}
export default Layout;