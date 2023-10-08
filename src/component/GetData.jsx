import { useAxios } from "./useAxios";
import UseSwr from "./UseSwr";

const url = import.meta.env.VITE_API_URL;

const getAll = async () => await useAxios.get("/api/product");

const getAllRe = () => UseSwr(`${url}/api/product`);

const upload = async (data, onUploadProgress) =>
    await useAxios.post("/api/files", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "multipart/form-data",
        },
        onUploadProgress,
    });
const get = async (id) => await useAxios.get(`/api/product/${id}`);
const create = async (data) => await useAxios.post("/api/product", data);
const update = async (id, data) => await useAxios.put(`/api/product/${id}`, data);
const remove = (id) => useAxios.delete(`/api/product/${id}`);
const removeAll = () => useAxios.delete(`/api/product`);

const findIp = async (ip) => await useAxios.get(ip ? `/ip?ip=${ip}` : `/ip`);
const findPing = async (ip) => await useAxios.get(`/ping?ip=${ip}`);
const findPingRe = (ip) => UseSwr(`${url}/ping?ip=${ip}`);

const signin = async (data) => await useAxios.post("/auth/signin", data);
const signup = async (data) => await useAxios.post("/auth/signup", data);

const users = async ({ token }) => {
    useAxios.defaults.headers.common["authtoken"] = token;
    return await useAxios.post("/auth/users");
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
    findPingRe,
};

export default GetData;
