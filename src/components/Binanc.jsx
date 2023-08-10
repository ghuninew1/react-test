import {useEffect, useState} from 'react'
import io from "socket.io-client";

export default function Binances() {
  // const [text, setText] = useState([]);
  const [data,setData] = useState([]);
  const [time, setTime] = useState();

    useEffect(() =>{  
      fetchData();
    },[]);
    
    async function fetchData() {
      const socket = await io('ws://localhost:3000',{ transports: ["websocket"] }); 
      socket.on('nodeData', (symbols)=>{
        setData(symbols)
    }); 

  }
return (
  <div>
    <Binance text={data} />
  </div>
)
}

function Binance({text}) {
    const tableRow2 = 
      <tr >
        <td>{text.s}</td>
        <td>{Number(text.c).toFixed(2)}</td>
        <td>{Number(text.h).toFixed(2)}</td>
        <td>{Number(text.l).toFixed(2)}</td>
        <td>{Number(text.v).toFixed(4)}</td>
        <td>{new Date(text.E).toLocaleTimeString('th')}</td>

      </tr>
    return (
      <>
        <table className="table">
        {text === undefined || text === null ? 'Loading...' : 
        <>
        <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>PriceHi</th>
              <th>PriceLo</th>
              <th>Volume</th>
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