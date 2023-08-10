import {useEffect, useState} from 'react'
import io from "socket.io-client";

function Status() {
  const [data,setData] = useState([]);
  const [time, setTime] = useState();

    useEffect(() =>{  
      fetchData();
      setInterval(() => {
        setTime(new Date().toLocaleTimeString('th'))    
      }, 1000);
    },[]);
    
   async function fetchData() {
      const socket = await io('ws://localhost:3000',{ transports: ["websocket"] }); 
      socket.emit("message", "hello");
      socket.on('nodeStatus', ({id,status,ip,label,time,lency})=>{
          setData((prevData)=>({
            ...prevData,
              [id]:{status,ip,label,time,lency},
          }))
      });      
    }

  return (
    <div>
      {time}
      <Pings data={data} />
    </div>
  )
}

function Pings({data}) {
   const tableRow = Object.values(data).map((node,idx)=>(
    <tr key={idx}>
      <td>{node.ip}</td>
      <td>{node.label}</td>
      <td>{node.status}</td>
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