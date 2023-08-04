const express = require('express');
const {createServer} = require('http');
const socketIO = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = socketIO(httpServer,{
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const ping = require('ping');

const nodeData = [
  {id:1, label:'test1', status:'up', ip:'127.0.0.1',time:''},
  {id:2, label:'test2', status:'up', ip:'192.168.0.100',time:''},
  {id:3, label:'test3', status:'up', ip:'192.168.0.1',time:''},
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
        time: new Date().toLocaleTimeString('TH','th'),
      });
    });
  })
}

setInterval(pingAndupdate, 10000);


app.get('/', (req, res) => {
  console.log('Hello World!')
  res.send('Welcome')
});

httpServer.listen(3001, () => console.log('Example app listening on port 3001!'));