const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: 'http://localhost:',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
const server = http.createServer(app);
const io = socketIO(server);
const ping = require('ping');

const nodeData = [
  {id:1, label:'test1', status:'up', ip:'127.0.0.1'},
  {id:2, label:'test2', status:'up', ip:'192.168.0.101'},
  {id:3, label:'test3', status:'up', ip:'192.168.0.1'},
]

const pingAndupdate =()=> {
  Object.values(nodeData).forEach((node)=>{
    ping.sys.probe(node.ip, (isAlive) => {
      const updateStatus = isAlive ? 'up' : 'down';
      io.emit('nodeStatus', {
        id: node.id,
        status: updateStatus,
        ip: node.ip,
        label: node.label,
      });
    });
  })
}

setInterval(pingAndupdate, 10000);


app.get('/',cors(corsOptions), (req, res) => {
  console.log('Hello World!')
  res.send('Welcome')
});

server.listen(3001,cors(corsOptions), () => console.log('Example app listening on port 3001!'));