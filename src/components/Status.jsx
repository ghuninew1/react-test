import React,{useEffect, useState} from 'react'
import io from 'socket.io-client'

function Status() {
    const [data,setData] = useState()
    useEffect(() =>{
      const socket = io('ws://localhost:3001')
        socket.on('nodeStatus',({id,status,ip,label,time})=>{
            setData((prevData)=>({
              ...prevData,
                [id]:{status,ip,label,time}
            }))
        })
    },[]);
  
    console.log(data)
    if(data === undefined || data === null){
      return <p>Loading..</p>
    }
    const tableRow = Object.values(data).map((node,idx)=>(
      <tr key={idx}>
        <td>{node.ip}</td>
        <td>{node.label}</td>
        <td>{node.status}</td>
        <td>{node.time}</td>
      </tr>
    ))
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>IP</th>
            <th>Label</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {tableRow}
        </tbody>
      </table>
    </div>
  )
}

export default Status