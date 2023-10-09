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
    const socket = UseSocket();


    const ip1Ref = useRef(null);
    const ip2Ref = useRef(null);
    const ip3Ref = useRef(null);
    const intRef = useRef(null);

    const resetFileInput = () => {};

    const dataResult = (items = []) => {
        if (IsDataObject(items)) {            
            return Object.entries(items).map(([key, value]) => (
                <tr key={key}>
                    <td>{IsNumber(res.responses?.mean * 1000)}</td>
                    <td>{value.host}</td>
                    <td>{value.inputHost}</td>
                    <td>{value.avg}</td>
                    <td>{value.max}</td>
                    <td>{value.min}</td>
                    <td>{value.time}</td>
                    <td>{value.packetLoss}</td>

                </tr>
            ));
        } else return null;
    };

    // const ip = inputRef.current.value;

    const hendleSubmit = async (e) => {
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

        console.log("nodeData", nodeData);

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
    // console.log("datas", datas);
    // console.log("res", res.responses.mean);

    const handleClose = () => {
        socket.close();
        socket.off();
        
    };

    return (
        <Container>
            <Form
                onSubmit={hendleSubmit}
                className="d-flex flex-column justify-content-center align-items-center"
            >
                <Form.Group className="mb-3">
                    <InputGroup className="mb-3">
                        <InputGroupText>IP</InputGroupText>
                            <Form.Control
                                type="number"
                                name="int"
                                placeholder="Interval"
                                className="form-control form-switch mx-2"
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
                        <Button
                            variant="outline-secondary"
                            onClick={resetFileInput}
                            className="btn-sm"
                        />

                        <Button variant="outline-info" type="submit" className="btn-sm">
                            Submit
                        </Button>
                        <Button variant="outline-danger" 
                        className="btn-sm" onClick={handleClose}>
                            Close
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="ms-3 mb-3 input-group justify-content-center align-items-center">
                    {/* <Form.Check type="checkbox" onChange={() => setCheck(!check)} /> */}
                </Form.Group>
            </Form>
            <Table striped bordered hover variant="" hidden={!visible} className="table-responsive">
                <thead>
                    {datas && (
                        <tr>
                            <th>Res</th>
                            <th>Host</th>
                            <th>InputHost</th>
                            <th>Avg</th>
                            <th>Max</th>
                            <th>Min</th>
                            <th>Time</th>
                            <th>PacketLoss</th>
                        </tr>
                    )}
                </thead>
                <tbody>{dataResult(datas)}</tbody>
            </Table>
        </Container>
    );
}
