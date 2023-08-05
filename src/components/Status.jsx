import React,{useEffect, useState} from 'react'
import io from 'socket.io-client'

function Status() {
  const [data,setData] = useState([]);
  const [text, setText] = useState([]);
  const [time, setTime] = useState();

    useEffect(() =>{ 
      fetchData();
      setInterval(() => {
        setTime(new Date().toLocaleTimeString('th'))    
      }, 1000);
      
    },[]);
    
    function fetchData() {
      const socket = io('ws://localhost:3001')     
      socket.on('nodeStatus', ({id,status,ip,label,time,lency})=>{
          setData((prevData)=>({
            ...prevData,
              [id]:{status,ip,label,time,lency},
          }))
      });
      socket.on('dataFetch',({symbol,price,time})=>{
        setText((prevText)=>({
         ...prevText,
              [symbol]:{price,time},
        }))
      })
    }    

  return (
    <div>
      {time}
      <Pings data={data} />
      <Binance text={text} />
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
function Pings({data}) {

  const tableRow = Object.values(data).map((node,idx)=>(
    <tr key={idx}>
      <td>{node.ip}</td>
      <td>{node.label}</td>
      <td>{node.status}</td>
      <td>{node.time}</td>
      <td>{node.lency}</td>
    </tr>
  ));
  return (
    <>
      <table className="table">
      {data === undefined || data === null ? 'Loading..' :
      <>
      <thead>
          <tr>
            <th>IP</th>
            <th>Label</th>
            <th>Status</th>
            <th>Time</th>
            <th>Latency</th>
          </tr>
        </thead>
        <tbody>
          {tableRow}
        </tbody>
      </>
       }
      </table>
    </>
  )
}

export default Status