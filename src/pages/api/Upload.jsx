import { useState, useRef } from "react";
import { Progress } from "reactstrap";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import axios from "axios";

const Upload = () => {
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [showProgressBar, setProgressBarVisibility] = useState(false);
    const [files, setFiles] = useState(null);
    const [name, setName] = useState("");
    const [upload, setUpload] = useState("");

    const inputRef = useRef(null);

    const resetFileInput = () => {
        inputRef.current.value = null;
        setFiles(null);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setProgressBarVisibility(true);
        const formData = new FormData();
        const onUploadProgress = (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded * 100) / total);
            setUpload(`${loaded}kb of ${total}kb | ${percent}%`);
            setUploadPercentage(percent);
        };
        formData.append("file", files[0]);
        formData.append("name", name);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        };
        const url = import.meta.env.VITE_API_URL + "api/files";
        axios
            .post(url, formData, config)
            .then((res) => {
                setUpload(res.data.message +" : "+ res.data.upload)
            })
            .catch((err) => console.log(err));

        setTimeout(() => {
            setProgressBarVisibility(false);
            setUploadPercentage(0);
            setName("");
            setUpload("");
            resetFileInput();
        }, 3000);
    };

    return (
        <Container className="text-center vh-50 d-flex align-items-center justify-content-center">
            <Form className="w-50" onSubmit={onSubmit}>
                {files && files.length > 0 && (
                    <Form.Label>
                        <h3>File Details:</h3>
                        {files[0].name && <p>File Name: {files[0].name} </p>}
                        {files[0].type && <p>File Type: {files[0].type} </p>}
                        {files[0].lastModifiedDate && (
                            <p>File Last Modified: {files[0].lastModifiedDate.toDateString()} </p>
                        )}
                        {files[0].size && <p>File Size: {files[0].size / 1000} KB</p>}
                        {files[0].type.includes("image") && (
                                <img
                                    src={URL.createObjectURL(files[0])}
                                    alt="preview"
                                    style={{ width: "200px", height: "auto" }}
                                />
                            )}
                    </Form.Label>
                )}
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>{upload}</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Name</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <InputGroup.Text>Upload</InputGroup.Text>
                        <Form.Control
                            type="file"
                            className="form-control"
                            aria-label="Upload"
                            onChange={(e) => setFiles(e.target.files)}
                            formEncType="multipart/form-data"
                            disabled={showProgressBar}
                            ref={inputRef}
                        />
                        <Button variant="outline-secondary" onClick={resetFileInput}>
                            Clear
                        </Button>
                    </InputGroup>
                    <Button variant="outline-success" type="submit">
                        Submit
                    </Button>
                    <br />
                    <br />
                    <Progress
                        max="100"
                        animated
                        value={uploadPercentage}
                        color="danger"
                        hidden={!showProgressBar}
                    >
                        {showProgressBar && uploadPercentage}%
                    </Progress>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default Upload;
