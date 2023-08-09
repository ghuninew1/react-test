import {useEffect, useState} from 'react'
import io from "socket.io-client";

export default function Binances() {
  // const [text, setText] = useState([]);
  const [data,setData] = useState([]);
  const [time, setTime] = useState();

    useEffect(() =>{  
      fetchData();
    },[]);
    
    function fetchData() {
      const socket = io({ transports: ["websocket"] }); 

      socket.on('dataFetch',(message)=>{
        setData(message);
    }); 
  }
  console.log(data);
return (
  <div>
    {/* <Binance text={text} /> */}
  </div>
)
}

function Binance({text}) {
    const tableRow2 =Object.keys(text).map((symbol,idx)=>(
      <tr key={idx}>
        <td>{symbol}</td>
        <td>{Number(text[symbol].price).toFixed(2)}</td>
        <td>{text[symbol].time}</td>
      </tr>));
    return (
      <>
        <table className="table">
        {text === undefined || text === null ? 'Loading...' : 
        <>
        <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
          {tableRow2}
          </tbody>
        </>}
        </table>
      </>
    );
  }