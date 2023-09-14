import { useState, useContext } from "react";
import "./App.css";
import { DataContext } from "./store/DataContext";

export default function App() {
    const [count, setCount] = useState(0);

    const ResPos = ({start}) => {
        // const data = useContext(DataContext);
        const data = 1;
        const end = (new Date().getTime() - start[0]) / 1000;
        return (
            <>
                {data === undefined || data === null ? 'Loading..' :
                    <>
                        <h1>Count: {count}</h1>
                        <h1>Time: { Number(end).toFixed(4)}</h1>
                        <button onClick={() => setCount(count + 1)}>Increment</button>
                    </>
                }
            </>
        )                

    };

    return (
        <DataContext.Provider value={count}>
            <ResPos start={[new Date().getTime()]}/>
        </DataContext.Provider>
    );
}

