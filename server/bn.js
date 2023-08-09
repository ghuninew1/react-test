import SocketClient from './lib/socketClient';

export const binanceapi = () =>{
 
  const streamName = 'btcusdt@trade';

  const socketClient = new SocketClient(`ws/${streamName}`, 'wss://stream.binance.com:9443/');
  socketClient.setHandler('trade', (params) => {
    const current = +new Date;
    const TvsNow = current - params.T;
    const EvsNow = current - params.E;
    const EvsT = params.E - params.T;
    console.log(`[Spot ${streamName}] current:${current} delta TvsNow: ${TvsNow}, EvsNow: ${EvsNow}, EvsT: ${EvsT}`);
  });
// close websocket stream
}