import { useState, useEffect } from "react";

const base_url = "https://api.ghuninew.workers.dev/api/data";

const Api = () => {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [isDel, setIsDel] = useState(true);
    const [isId, setIsId] = useState(null);
    const [name, setName] = useState();
    const [alt, setAlt] = useState();
    const [imag, setImag] = useState();
    const [post_id, setPost_id] = useState();
    const [update_at, setUpdate_at] = useState(null);

    useEffect(() => {
        FechData(setData);
    }, []);

    //check delete confirm and cancel alert
    const conFirm = (id) => {
        setIsDel(true);
        if (window.confirm("Are you sure you wish to delete this item?")) {
            DeleteData(id);
            setIsDel(false);
        } else {
            // alert("cancel");
            setIsDel(false);
        }
    };

    //function insert data
    const updateData = async (e) => {
        e.preventDefault();

        await fetch(base_url + "/" + isId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                alt: alt,
                imag: imag,
                post_id: post_id,
            }),
        });
        setName("");
        setAlt("");
        setImag("");
        setPost_id("");
        setIsId(null);
        FechData();
    };

    //function cancel edit data
    const cancelData = () => {
        setIsId(null);
        setName(null);
        setAlt(null);
        setImag(null);
        setPost_id(null);
    };

    //function edit data
    const editData = (id) => (
        setIsId(id),
        setName(data[id - 1].name),
        setAlt(data[id - 1].alt),
        setImag(data[id - 1].imag),
        setPost_id(data[id - 1].post_id)
    );
    // show data from api && edit data by id put button && delete data by id delete button
    const showData = data.map((item, index) => (
        <tr key={index}>
            {isId !== item.id ? (
                <td>{item.name}</td>
            ) : (
                <td>
                    <input
                        type="text"
                        placeholder={item.name}
                        value={name !== undefined || null ? name : item.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </td>
            )}
            {isId !== item.id ? (
                <td>{item.alt}</td>
            ) : (
                <td>
                    <input
                        type="text"
                        placeholder={item.alt}
                        value={alt !== undefined || null ? alt : item.alt}
                        onChange={(e) => setAlt(e.target.value)}
                    />
                </td>
            )}
            {isId !== item.id ? (
                <td>{item.imag}</td>
            ) : (
                <td>
                    <input
                        type="text"
                        placeholder={item.imag}
                        value={imag !== undefined || null ? imag : item.imag}
                        onChange={(e) => setImag(e.target.value)}
                    />
                </td>
            )}
            {isId !== item.id ? (
                <td>{item.post_id}</td>
            ) : (
                <td>
                    <input
                        type="text"
                        placeholder={item.post_id}
                        value={
                            post_id !== undefined || null
                                ? post_id
                                : item.post_id
                        }
                        onChange={(e) => setPost_id(e.target.value)}
                    />
                </td>
            )}
            <td>{item.update_at}</td>
            <td>
                {isId !== item.id ? (
                    <button onClick={() => editData(item.id)}>edit</button>
                ) : (
                    <button onClick={(e) => updateData(e)}>Save</button>
                )}
            </td>
            <td>
                {isId === item.id ? (
                    <button onClick={cancelData}>cancel</button>
                ) : (
                    <button onClick={() => conFirm(item.id)}>delete</button>
                )}
            </td>
        </tr>
    ));
    //return view count
    return (
        <div className="App">
            <table className="table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>alt</th>
                        <th>imag</th>
                        <th>post_id</th>
                        <th>update_at</th>
                        <th>edit</th>
                        <th>del</th>
                    </tr>
                </thead>
                <tbody>
                    {!update_at ? (
                        showData
                    ) : (
                        <PostData setUpdate_at={setUpdate_at} />
                    )}
                   {/* <tr> <button onClick={() => setUpdate_at(true)}>Cre</button></tr> */}
                </tbody>
            </table>
        </div>
    );
};

const FechData = async (setData) => {
    const response = await fetch(base_url);
    const data = await response.json();
    setData(data);
};

//function post insert data
const PostData = ({ setUpdate_at }) => {
    //function insert data
    const [name, setName] = useState("");
    const [alt, setAlt] = useState("");
    const [imag, setImag] = useState("");
    const [post_id, setPost_id] = useState("");

    const inSertData = async () => {
        const response = await fetch(base_url + "/p", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                alt: alt,
                imag: imag,
                post_id: post_id,
            }),
        });
        const data = await response.json();
        // console.log(data);

        //show alert post success
        alert(`post success ${data}`);

        //set delay 2 sec and finish clear data and reload fetch data
        setTimeout(() => {
            setName("");
            setAlt("");
            setImag("");
            setPost_id("");
            FechData();
        }, 2000);
    };

    //return input data from interface
    return (
        <tr className="form">
            <td>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </td>
            <td>
                <input type="text" onChange={(e) => setAlt(e.target.value)} />
            </td>
            <td>
                <input type="text" onChange={(e) => setImag(e.target.value)} />
            </td>
            <td>
                <input
                    type="text"
                    onChange={(e) => setPost_id(e.target.value)}
                />
            </td>
            <td>
                <input placeholder={new Date().toLocaleString("th")} />
            </td>
            <td>
                <button onClick={inSertData}>Create</button>
            </td>
            <td>
                <button onClick={() => setUpdate_at(null)}>Cancel</button>
            </td>
        </tr>
    );
};

//function delete data see param id match id data
const DeleteData = async (id) => {
    const response = await fetch(base_url + "/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log(data);
    FechData();
};

export default Api;
