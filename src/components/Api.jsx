import { useState, useEffect } from "react";
// import Layout from "./Layout";

const Api = ()  => {
  const [text, setText] = useState([]);
    // const [count, setCount] = useState(0);
    // const [isActive, setIsActive] = useState(true);
     useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(data=>data.json())
      .then(data=>setText(data))
     }, []);



      
console.log(text)
  return (
    <>
      {text.map((data)=><ul key={data.id}>
        <li>{data.id} {data.title}</li>
      </ul>)}
    </>
  )
}
export default Api