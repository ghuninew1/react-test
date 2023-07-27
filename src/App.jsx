/* eslint-disable react/prop-types */
// import { useState,useEffect } from "react";
import "./App.css";
import Binance from "./components/Binance";
import Themes from "./components/Themes";
// import Svgext from "./components/Svgext";
import GitHubCorner from "./components/GitHubCorner";

export default function App() {
  return (
    <Themes title={""}>
      <div className="App">
        <Binance />
        <div className="api"></div>
        <GitHubCorner url="https://github.com/ghuninew1" />
      </div>
    </Themes>
  );
}
