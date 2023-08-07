import { useState, useEffect } from "react";
// import Layout from "./Layout";
import "./Binance.css";

export default function Binance() {
    const [text, setText] = useState();
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(() => new Date());
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        fetchData();
        const id = setInterval(() => fetchData(), 5000);
        const id2 = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(id, id2);
    }, []);

    async function fetchData() {
        await fetch(
            "https://api.binance.com/api/v3/ticker/price?symbols=%5B%22BTCUSDT%22%2C%22ETHUSDT%22%5D"
        )
            .then((res) => res.json())
            .then((res) => {
                setText(res);
            })
            .catch((err) => {
                console.log(err);
                setText("An error fetchData!");
            });
    }
    const onClickLi = () => {
        count === 0 ? setCount(1) : setCount(0);
    };

    return (
        <div className='home'>
          <p className="time">{time.toLocaleTimeString("th-TH")}</p>
            <div className='ta'>
                    {isActive && (
                        <>
                            {text && text.map((d, idx) => (
                              <ul key={idx}>
                                  {idx === count && (
                                      <>
                                          <p onClick={onClickLi}>
                                              {Number(d.price).toFixed(2)}
                                              : {d.symbol}
                                          </p>
                                      </>
                                  )}
                              </ul>
                            ))}
                        </>
                    )}
                <button className="btn" onClick={() => isActive ? setIsActive(false) : setIsActive(true)}>
                {isActive ? "S" : "H"}
            </button>
            </div>
        </div>
    );
}
