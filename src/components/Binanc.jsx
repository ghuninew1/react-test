import { WebsocketAPI } from '@binance/connector'
import { useState} from 'react'

export function Binanc() {
  // const [text, setText] = useState([]);
  const logger=[]
  const callbacks = {
  open: (client) => {
    console.log('Connected with Websocket server')
    client.tickerPrice({ symbols: ['BTCUSDT','ETHUSDT'] })
  },
  close: () => console.log('Disconnected with Websocket server'),
  message: data =>  console.log(data)

}

const websocketStreamClient = WebsocketAPI(null, null,{logger, callbacks })

// close websocket stream
setTimeout(() => websocketStreamClient.disconnect(), 50000)
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