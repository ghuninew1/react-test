import {WebsocketStream} from '@binance/connector';
import { Console } from 'console'

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })
export const binanceapi = (io) =>{

const binancesApi =()=>{
  const callbacks = {
  open: () => logger.debug('Connected with Websocket server'),
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => io.emit('nodeData', JSON.parse(data)),
}
const websocketStreamClient = new WebsocketStream({ logger, callbacks })
// websocketStreamClient.subscribe('ethusdt@kline_1s')
// disconnect the connection
websocketStreamClient.miniTicker('ethusdt')
// websocketStreamClient.rollingWindowTicker('1h', 'ethusdt')
// websocketStreamClient;
// websocketStreamClient.subscribe('ethusdt@kline_1s') 
}
// setInterval(() => binancesApi() ,5000)
// close websocket stream
binancesApi();
}