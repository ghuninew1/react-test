import React, { useState, useEffect } from "react";
import Layout from "./Layout";

export default function AppScript() {
    const [text, setText] = useState([]);

    useEffect(() => {
      fetchData()
      // const interval = setInterval(() => fetchData(), 2000);
      //     return () => clearInterval(interval);
    }, []);
    
    async function fetchData() {
      await fetch('https://script.google.com/macros/s/AKfycbxTpRocnVAzTg5ixRA9kuY2d0b2x01CkXjm50DRbdDK9QHcxRIZA6xCxFZPFKsLyJRNPw/exec')
      .then((res) => res.json())
      .then((data) => {
        setText(data);
      })
      .catch((err) => {
        console.log(err)
        setText("An error occurred!")
      });
    }
  return (
    <div className="">
    <div className="appscript">{text.map(d=> d.a > 0 && <li key={d.a}><Layout txtMain={d.b} txtImg={d.d} txtInfo={d.f}/></li>)}</div>
    </div>
  );
}
