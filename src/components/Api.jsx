import { useState, useEffect } from "react";
// import Layout from "./Layout";

export default function Api({url}) {
    const [text, setText] = useState();
    const [count, setCount] = useState(0);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        fetchData();
        const id = setInterval(() => fetchData(), 5000);
        return () => clearInterval(id);
    }, []);

    async function fetchData() {
        await fetch(url)
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
            <div className='ta'>
                <div className='taa'>
                    {isActive && (
                        <>
                        {text.map((data)=>(data))}
                        </>
                    )}
                </div>
            </div>
            <button
                onClick={() =>
                    isActive ? setIsActive(false) : setIsActive(true)
                }>
                {isActive ? "S" : "H"}
            </button>
        </div>
    );
}
