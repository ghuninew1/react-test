// import { useState, useEffect } from "react";
// import Layout from "./Layout";

const Api = (url,header)  => {
    // const [text, setText] = useState();
    // const [count, setCount] = useState(0);
    // const [isActive, setIsActive] = useState(true);
   const response = fetch({url},{header}
      .then(data=>data.json())
      .then(data=>console.log(data))
      )
  const json = response.json()
  return json
}
export {Api}