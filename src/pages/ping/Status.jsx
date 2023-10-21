import { useState, useRef } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
// import GetData from "../../component/GetData";
import socket from "../../component/UseSocket";
import { IsDataObject, IsNumber } from "../../component/utils";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import CircularProgressBar from "../../component/CircularProgressBar";

export default function Status() {
    const [datas, setDatas] = useState([]);
    const [res, setRes] = useState([]);
    // const [check, setCheck] = useState(false);
    const [visible, setVisible] = useState(false);

    const resetFileInput = (e) => {
        e.preventDefault();
        const formData = document.getElementById("ipgroup");
        formData.innerHTML = "";
    };

    const dataResult = (items = []) => {
        if (IsDataObject(items)) {
            return Object.entries(items).map(([key, value]) => (
                <tr key={key}>
                    <td>{IsNumber(res.responses?.mean, 6)}</td>
                    <td>{value.numeric_host}</td>
                    <td>{value.inputHost}</td>
                    <td>{value.avg}</td>
                    <td>{value.max}</td>
                    <td>{value.min}</td>
                    <td>{IsNumber(value.time, 2)}</td>
                </tr>
            ));
        } else return null;
    };

    // const ip = inputRef.current.value;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const dataObj = Object.fromEntries(data.entries());

        const ips = [];
        Object.keys(dataObj).forEach((key) => {
            if (key.includes("ip")) {
                ips.push(dataObj[key]);
            }
        });
        const ints = [];
        Object.keys(dataObj).forEach((key) => {
            if (key.includes("int")) {
                ints.push(dataObj[key]);
            }
        });
        const nodeData = {};
        for (let i = 0; i < ips.length; i++) {
            nodeData[i] = { ip: ips[i], int: ints[i] };
        }

        console.log("nodeData", nodeData);

        socket.connect();
        socket.emit("status", nodeData);

        socket.on("nodeStatus", (data) => {
            setRes(data);
            setDatas((prevData) => ({
                ...prevData,
                [data.id]: data.data,
            }));
            setVisible(true);
        });
    };

    const handleClose = () => {
        socket.close();
    };

    let count = 1;
    const addIp = () => {
        const input = document.getElementById("ipgroup");
        const div = document.createElement("div");
        const span = document.createElement("span");
        const span2 = document.createElement("span");
        const ipadd = document.createElement("input");
        const intadd = document.createElement("input");

        div.setAttribute("class", "input-group-sm input-group");
        span.setAttribute("class", "input-group-text");
        span.innerHTML = "int";
        intadd.setAttribute("type", "number");
        intadd.setAttribute("name", `int${count++}`);
        intadd.setAttribute("placeholder", "Interval");
        intadd.setAttribute("class", "form-control");
        intadd.setAttribute("value", 1);
        span2.setAttribute("class", "input-group-text");
        span2.innerHTML = "ip";
        ipadd.setAttribute("type", "text");
        ipadd.setAttribute("name", `ip${count++}`);
        ipadd.setAttribute("placeholder", "Ip");
        ipadd.setAttribute("class", "form-control");

        div.appendChild(span);
        div.appendChild(intadd);
        div.appendChild(span2);
        div.appendChild(ipadd);
        input.appendChild(div);
    };

    return (
        <Container>
            <Form
                className="form-group w-50 mx-auto my-3 border border-2 p-3 rounded-3"
                onSubmit={handleSubmit}
            >
                <Form.Group className="btn-group btn-group-sm d-flex justify-content-between accordion mb-2">
                    <Button onClick={addIp} className="btn-group-sm" variant="outline-info">
                        Add Ip
                    </Button>
                    <Button onClick={resetFileInput} className="btn-group-sm " variant="outline-danger">
                        reset{" "}
                    </Button>
                    <Button type="submit" className="btn-group-sm" variant="outline-success">
                        Submit
                    </Button>
                    <Button onClick={handleClose} className="btn-group-sm " variant="outline-warning">
                        Close
                    </Button>
                </Form.Group>
                <Form.Group id="ipgroup">
                    <InputGroup className="input-group-sm">
                        <InputGroupText>int</InputGroupText>
                        <Form.Control
                            type="number"
                            name="int"
                            placeholder="Interval"
                            className="form-group"
                            defaultValue={1}
                        />
                        <InputGroupText>ip</InputGroupText>

                        <Form.Control type="text" name="ip" placeholder="Ip" />
                    </InputGroup>
                </Form.Group>
            </Form>

            <Table striped bordered hover variant="" hidden={!visible} className="table-sm mt-4">
                <thead>
                    {datas && (
                        <tr className="text-center align-middle">
                            <th>Res (ms)</th>
                            <th>Host</th>
                            <th>InputHost</th>
                            <th>Avg (ms)</th>
                            <th>Max (ms)</th>
                            <th>Min (ms)</th>
                            <th>Time (ms)</th>
                        </tr>
                    )}
                </thead>
                <tbody className="text-center align-middle">{dataResult(datas)}</tbody>
            </Table>
            <Container className="text-center">
            <CircularProgressBar
                    selectedValue={IsNumber(res.responses?.mean * 1000, 3)}
                    maxValue={50}
                    label={IsNumber(datas[0]?.time, 2) + " ms"}
                    radius={80}
                    withGradient
                    anticlockwise

                />
                </Container>
            
        </Container>
    );
}
