import { useState, useEffect } from "react";
import { Table, Button, InputGroup, Form } from "react-bootstrap";
import GetData from "../../component/GetData";
import {
    ToLocalTime,
    IsDataArray,
    IsData,
    Image,
    IsConfirm,
    ShowSuccess,
} from "../../component/utils";
import { Link } from "react-router-dom";

const Crud = () => {
    const [datas, setDatas] = useState([]);
    const [message, setMessage] = useState("");
    const { data } = GetData.getAllRe();
    const [isEdit, setIsEdit] = useState(null);

    useEffect(() => {
        if (IsData(data)) {
            setDatas(IsData(data) ? data : []);
        }
    }, [data]);

    const handleDelete = async (id) => {
        if (IsConfirm("Delete")) {
            const res = await GetData.remove(id);
            if (res.status === 200) {
                setDatas(datas.filter((item) => item._id !== id));
                setMessage("Delete Success");
            }
        } else {
            setMessage("Delete Cancel");
        }
    };

    const dataValue = (items = []) => {
        if (IsDataArray(items)) {
            return items?.map((item) => (
                <tr key={item._id} className="table-hover">
                    <td>
                        {!isEdit ? (
                            item.name
                        ) : (
                            <Form.Control type="text" name="name" placeholder="name" />
                        )}
                    </td>
                    <td>
                        {isEdit !== item._id ? (
                            item.detail
                        ) : (
                            <Form.Control type="text" name="detail" placeholder="detail" />
                        )}
                    </td>
                    <td>
                        {isEdit !== item._id ? (
                            item.price
                        ) : (
                            <Form.Control type="number" name="price" placeholder="price" />
                        )}
                    </td>
                    <td>
                        {isEdit !== item._id ? (
                            <Image
                                src={import.meta.env.VITE_API_URL + "/uploads/" + item?.file}
                                alt={item.name}
                            />
                        ) : (
                            <Form.Control type="file" name="file" placeholder="file" />
                        )}
                    </td>

                    <td>{ToLocalTime(item.updatedAt)}</td>
                    <td>{ToLocalTime(item.createdAt)}</td>
                    <td className="table-responsive">
                        <InputGroup>
                            <Button variant="outline-warning" onClick={() => setIsEdit(item._id)}>
                                Edit
                            </Button>
                            <Button variant="outline-danger" onClick={() => handleDelete(item._id)}>
                                Del
                            </Button>
                        </InputGroup>
                    </td>
                </tr>
            ));
        }
    };
    return (
        <div className="container">
            {ShowSuccess(message)}
            <Button variant="outline-info" className="float-end">
                <Link to="/api/create" className="text-decoration-none text-info">
                    Create
                </Link>
            </Button>
            <Table striped bordered hover variant="" hidden={false}>
                <thead>
                    {datas && (
                        <tr>
                            <th>name</th>
                            <th>detail</th>
                            <th>price</th>
                            <th>file</th>
                            <th>updatedAt</th>
                            <th>createdAt</th>
                            <th>Action</th>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {IsDataArray(datas) ? (
                        dataValue(datas)
                    ) : (
                        <tr>
                            <td colSpan="7">No Data</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default Crud;
