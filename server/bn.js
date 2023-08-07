import { WebsocketAPI } from '@binance/connector'

export const BinancApi = (io) =>{
    const callbacks = {
  open: (client) => {
    console.log('Connected with Websocket server')
    client.tickerPrice({ symbols: ['BTCUSDT','ETHUSDT'] })
  },
  close: () => console.log('Disconnected with Websocket server'),
  message: data =>  io.emit('dataFetch',data)
}

const websocketStreamClient = new WebsocketAPI(null, null,{ console, callbacks })

// close websocket stream
setTimeout(() => websocketStreamClient.disconnect(), 50000)
}