import { useState, useRef } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
// import GetData from "../../component/GetData";
import UseSocket from "../../component/UseSocket";
import { IsDataObject, IsNumber } from "../../component/utils";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

export default function Status() {
    const [datas, setDatas] = useState([]);
    const [res, setRes] = useState([]);
    // const [check, setCheck] = useState(false);
    const [visible, setVisible] = useState(false);
    const {socket} = UseSocket();
    
    const ip1Ref = useRef(null);
    const ip2Ref = useRef(null);
    const ip3Ref = useRef(null);
    const intRef = useRef(null);

    const resetFileInput = () => {
        ip1Ref.current.value = "";
        ip2Ref.current.value = "";
        ip3Ref.current.value = "";
        intRef.current.value = "";
    };

    const dataResult = (items = []) => {
        if (IsDataObject(items)) {
            return Object.entries(items).map(([key, value]) => (
                <tr key={key}>
                    <td>{IsNumber(res.responses?.mean , 6)}</td>
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

    const HendleSubmit = (e) => {
        e.preventDefault();
        const ip = ip1Ref.current.value;
        const ip2 = ip2Ref.current.value;
        const ip3 = ip3Ref.current.value;
        const int = intRef.current.value;
        const nodeData = [];

        if (ip) {
            nodeData.push({ ip: ip, int: int });
        }
        if (ip2) {
            nodeData.push({ ip: ip2, int: int });
        }
        if (ip3) {
            nodeData.push({ ip: ip3, int: int });
        }
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

    return (
        <Container>
            <Form onSubmit={HendleSubmit} className="mt-4">
                <Form.Group className="input-group justify-content-center align-items-center">
                    <InputGroup className="input-group-sm">
                        <InputGroupText >
                        IP</InputGroupText>
                        <Form.Control
                            type="number"
                            name="int"
                            placeholder="Interval"
                            className="form-group"
                            size="sm"
                            aria-label="Interval"
                            ref={intRef}
                        />

                        <Form.Control
                            type="text"
                            name="ip"
                            placeholder="Ip"
                            aria-label="Ip"
                            ref={ip1Ref}
                        />
                        <Form.Control
                            type="text"
                            name="ip2"
                            placeholder="Ip2"
                            aria-label="Ip2"
                            ref={ip2Ref}
                        />
                        <Form.Control
                            type="text"
                            name="ip3"
                            placeholder="Ip3"
                            aria-label="Ip3"
                            ref={ip3Ref}
                        />

                        <Form.Group className="btn-group btn-group-sm">
                            <Button
                                variant="outline-secondary"
                                onClick={resetFileInput}
                                className="btn-group"
                            />
                            <Button variant="outline-info" type="submit" className="btn-group">
                                Submit
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="btn-group"
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                        </Form.Group>
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
                <tbody className="text-center align-middle">
                    {dataResult(datas)}
                    </tbody>
            </Table>
        </Container>
    );
}
