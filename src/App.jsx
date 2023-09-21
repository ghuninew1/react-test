import { useState } from "react";
import "./App.css";

export default function App() {
    const [count, setCount] = useState(0);


    return (
            <div className="App">
                <h1>React Context</h1>
                <h2>Count: {count}</h2>
                <button onClick={() => setCount(count + 1)}>Increment</button>
            </div>
    );
}

