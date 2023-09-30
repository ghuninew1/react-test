import { useState, useRef } from "react";
// import useSWR from 'swr'
// import axios from "axios";
import Request from "../../component/Request";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";

export default function Ping() {
    // const [datas, setDatas] = useState([]);
    const [ip, setIp] = useState(null);
    const [path, setPath] = useState("ip");
    const [visible, setVisible] = useState(true);

    const inputRef = useRef(null);
    const url = import.meta.env.VITE_API_URL + path + (ip === null || ip === "" ? "" : "?ip=") + (ip === null ? "" : ip)

    const { data, error } = Request({ url });
    if (error) return <div>failed to load</div>;
    

    const resetFileInput = () => {
        inputRef.current.value = null;
    };

    const handleChang = (e) => {
        setIp(e.target.value);
    };

    const dataResult = (items = []) => {
        if (path === "ping") {
            if (items.length > 1) {
                items.slice(1);
                return items.map((item) => (
                    <tr key={item.inputHost.toString()}>
                        <td>{item.host}</td>
                        <td>{item.inputHost}</td>
                        <td>{item.avg}</td>
                        <td>{item.max}</td>
                        <td>{item.min}</td>
                        <td>{item.time}</td>
                        <td>{item.packetLoss}</td>
                    </tr>
                ));
            } else {
                return Object.entries(items).map((item, index) => (
                    <tr key={index}>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                    </tr>
                ));
            }
        }
        if (path === "ip") {
            return Object.entries(items).map((item, index) => (
                <tr key={index}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                </tr>
            ));
        }
    };

    const hendleSubmit = async(e) => {
        e.preventDefault();
        setVisible(false);
    };

    return (
        <Container>
            <Form
                onSubmit={hendleSubmit}
                className="d-flex flex-column justify-content-center align-items-center"
            >
                <Form.Group className="mb-3">
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{path === "ping" ? "Ping" : "Dns"}</InputGroup.Text>

                        <Form.Control
                            type="text"
                            placeholder="Ip"
                            aria-label="Ip"
                            onChange={handleChang}
                            ref={inputRef}
                        />

                        <Button
                            variant="outline-secondary"
                            onClick={resetFileInput}
                            className="btn-sm"
                        />

                        <Button variant="outline-info" type="submit" className="btn-sm">
                            Submit
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="ms-3 mb-3 input-group justify-content-center align-items-center">
                    <Form.Check
                        type="radio"
                        value="ping"
                        onChange={(e) => setPath(e.target.value)}
                        checked={path === "ping" ? true : false}
                        label="Ping"
                    />
                    <div className="vr mx-2" />
                    <Form.Check
                        type="radio"
                        value="ip"
                        onChange={(e) => setPath(e.target.value)}
                        checked={path === "ip" ? true : false}
                        label="Dns"
                    />
                </Form.Group>
            </Form>
            <Table striped bordered hover variant="" hidden={!visible} className="table-responsive">
                <thead>
                    {path === "ping" && data ? (
                        <tr>
                            <th>Host</th>
                            <th>InputHost</th>
                            <th>Avg</th>
                            <th>Max</th>
                            <th>Min</th>
                            <th>Time</th>
                            <th>PacketLoss</th>
                        </tr>
                    ) : (
                        <tr>
                            <th>#</th>
                            <th>Value</th>
                        </tr>
                    )}
                </thead>
                <tbody>{dataResult(data)}</tbody>
            </Table>
        </Container>
    );
}
