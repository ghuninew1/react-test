
import {useAxios} from "./useAxios";
import Request from "./useRequest";
import { io } from "socket.io-client";

const url = "http://127.0.0.1:3001";

const getAll = () => useAxios.get("/api/product");
const getAllRe = () => Request(`${url}/api/product`);
const upload = (data, onUploadProgress) =>
    useAxios.post("/api/files", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "multipart/form-data",
        },
        onUploadProgress,
    });
const get = (id) => useAxios.get(`/api/product/${id}`);
const create = (data) => useAxios.post("/api/product", data);
const update = (id, data) => useAxios.put(`/api/product/${id}`, data);
const remove = (id) => useAxios.delete(`/api/product/${id}`);
const removeAll = () => useAxios.delete(`/api/product`);
const findIp = (ip) => useAxios.get(ip ? `/ip?ip=${ip}` : `/ip`);
const findPing = (ip) => useAxios.get(`/ping?ip=${ip}`);
const signin = (data) => useAxios.post("/auth/signin", data);
const signup = (data) => useAxios.post("/auth/signup", data);
const users = ({token}) => {
    useAxios.defaults.headers.common["authtoken"] = token;
    return useAxios.post("/auth/users");
};

export const SocketWs = () => {return io("ws://localhost:3001",{
        path: "/ws",
        transports: ["websocket", "polling", "webtransport"],
        cors: { origin: "*", credentials: true },
    }).connect()
};

const GetData = {
    getAll,
    getAllRe,
    get,
    upload,
    create,
    update,
    remove,
    removeAll,
    findIp,
    findPing,
    signin,
    signup,
    users,
};

export default GetData;
