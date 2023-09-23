import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
    const [data, setData] = useState([]);
    const [ip, setIp] = useState(null);
    const [path, setPath] = useState("ping");
    const [visible, setVisible] = useState(false);

    // useEffect(() => {}, []);

    const feshData = async () => {
        await axios
            .get(import.meta.env.VITE_API_URL + path + (ip===null ||ip==="" ? "":"?ip=") + (ip===null ? "" : ip))
            .then((data) => setData(data.data));
    };

    const dataResult = (items) => {
        if (items === null) return;
        return Object.entries(items).map((item, index) => (
            <tr key={index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
            </tr>
        ));
    };

    const hendleSubmit = (e) => {
        e.preventDefault();
        feshData();
        setVisible(true);
    };

    return (
        <div className="App">
            <div className="form">
                <form onSubmit={(e) => hendleSubmit(e)}>
                    <label>
                        <input
                            type="radio"
                            value="ping"
                            onChange={(e) => setPath(e.target.value)}
                            checked={path === "ping" ? true : false}
                        />
                        Ping
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ip"
                            onChange={(e) => setPath(e.target.value)}
                            checked={path === "ip" ? true : false}
                        />
                        Dns
                    </label>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter Ip"
                        onChange={(e) => setIp(e.target.value)}
                    />
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                        </svg>
                    </button>
                </form>
            </div>

            <table className="table">
                <tbody>
                    <tr></tr>
                </tbody>
                <tbody>{visible && dataResult(data)}</tbody>
            </table>
        </div>
    );
}
