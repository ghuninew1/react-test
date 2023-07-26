import { useState, useEffect } from "react";
// import Layout from "./Layout";
import SvgRun from './SvgRun';
import './Binance.css';

export default function Binance() {
    const [text, setText] = useState();
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(() => new Date());
    useEffect(() => {
      fetchData()
      const id = setInterval(() => fetchData() , 1000);
      return () => clearInterval(id);
    }, []);

    async function fetchData() {
      await fetch('https://api.binance.com/api/v3/ticker/price?symbols=%5B%22BTCUSDT%22%2C%22ETHUSDT%22%5D')
      .then((res) => res.json())
      .then((res) => {
        setText(res)
        setTime(new Date())
      })
      .catch((err) => {
        console.log(err)
        setText("An error fetchData!")
      });
    }
    function onClickLi(){
      isActive ? setIsActive(false) : setIsActive(true);
    }
console.log(JSON.stringify(text))
  return (
    <div className="home">
      <div className="ta">
        <div className="taa">
        {text && text.map((d,idx)=> 
        <ul key={idx} >
           {d.symbol[0]}: {Number(d.price).toFixed(2)}
           <li className="svg">
           {idx === 0 ? <SvgRun sVal={d.price} sText={d.symbol} sMax={35000} /> 
           : <SvgRun sVal={d.price} sText={d.symbol} sMax={3000} 
           />}
           </li>
        </ul>)}
        </div >
        <div onClick={onClickLi} >
        <p className="tap">
        {isActive ? time.toLocaleTimeString('th-TH') : time.toLocaleTimeString('en-EN')}
        </p> 
        </div>
      </div>
    </div>
  );
}