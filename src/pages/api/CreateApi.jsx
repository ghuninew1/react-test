import { useState, useRef } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import GetData from "../../component/GetData";
import { Progress } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ShowSuccess } from "../../component/utils";

const CreateApi = () => {
    const [check, setCheck] = useState(false);
    const nameRef = useRef(null);
    const detailRef = useRef(null);
    const priceRef = useRef(null);
    const fileRef = useRef(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [upload, setUpload] = useState("");
    const navigate = useNavigate();

    const resetFileInput = (e) => {
        e.preventDefault();
        fileRef.current.value = null;
        nameRef.current.value = null;
        detailRef.current.value = null;
        priceRef.current.value = null;
        setCheck(false);
    };

    const hendleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: nameRef.current.value,
            detail: detailRef.current.value,
            price: priceRef.current.value,
            file: fileRef.current.files[0],
        };

        const fromData = new FormData();
        fromData.append("name", data.name);
        fromData.append("detail", data.detail);
        fromData.append("price", data.price);
        fromData.append("file", data.file);

        const onUploadProgress = (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            setUpload(`${loaded}kb of ${total}kb | ${percent}%`);
            setUploadPercentage(percent);
        };

        setCheck(true);
        const res = GetData.create(fromData, onUploadProgress);
        res.then((res) => {
            console.log("res", res);
        });
        setTimeout(() => {
            setCheck(false);
            setUploadPercentage(0);
            navigate("/api/get");
        }, 1000);
    };

    return (
        <div className="container">
            {ShowSuccess(upload)}
            <Form
                onSubmit={hendleSubmit}
                className="form-group w-50 mx-auto my-5 border border-2 p-5 rounded-3"
            >
                <Form.Group className="form-group">
                    <InputGroup className="form-group mb-3">
                        <InputGroup.Text>name</InputGroup.Text>

                        <Form.Control type="text" name="name" placeholder="name" ref={nameRef} />
                    </InputGroup>
                    <InputGroup className="form-group-input mb-3">
                        <InputGroup.Text>detail</InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="detail"
                            placeholder="detail"
                            ref={detailRef}
                        />
                    </InputGroup>
                    <InputGroup className="form-group-input mb-3">
                        <InputGroup.Text>price</InputGroup.Text>
                        <Form.Control type="text" name="price" placeholder="price" ref={priceRef} />
                    </InputGroup>
                    <InputGroup className="form-group-input mb-3">
                        <InputGroup.Text>File</InputGroup.Text>
                        <Form.Control
                            type="file"
                            name="file"
                            placeholder="file"
                            ref={fileRef}
                            onChange={(e) => {
                                if (e.target.files[0]) {
                                    setCheck(true);
                                } else {
                                    setCheck(false);
                                }
                            }}
                        />
                        <Button variant="outline-secondary" onClick={resetFileInput} />
                    </InputGroup>
                    <InputGroup className="form-group-input mb-3">
                        <Button
                            variant="outline-warning"
                            onClick={() => navigate("/api/get")}
                            className="btn-group w-50 form-control"
                        >
                            Back
                        </Button>
                        <Button
                            variant="outline-success"
                            type="submit"
                            className="btn-group w-50 form-control d-flex justify-content-end"
                        >
                            Submit
                        </Button>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="form-group form-text">
                    {check && (
                        <img
                            src={URL.createObjectURL(fileRef.current.files[0])}
                            alt="preview"
                            style={{ width: "100px", height: "auto" }}
                        />
                    )}

                    {check && (
                        <>
                            <Form.Label>{upload}</Form.Label>
                            <Progress
                                max="100"
                                value={uploadPercentage}
                                variant="success"
                                color="danger"
                                hidden={!check}
                                className="mt-2"
                            >
                                {uploadPercentage} %
                            </Progress>
                        </>
                    )}
                </Form.Group>
            </Form>
        </div>
    );
};

export default CreateApi;
