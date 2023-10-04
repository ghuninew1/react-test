import useAxios from "./useAxios";
import Request from "./useRequest";

const url = "https://true.bigbrain-studio.com";

const getAll = () => useAxios.get("/api/files");
const getAllRe = () => Request(`${url}/api/files`);
const upload = (data, onUploadProgress) =>
    useAxios.post("/api/files", data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "multipart/form-data",
        },
        onUploadProgress,
    });
const get = (id) => useAxios.get(`/api/files/${id}`);
const create = (data) => useAxios.post("/api/files", data);
const update = (id, data) => useAxios.put(`/api/files/${id}`, data);
const remove = (id) => useAxios.delete(`/api/files/${id}`);
const removeAll = () => useAxios.delete(`/api/files`);
const findIp = (ip) => useAxios.get(ip ? `/ip?ip=${ip}` : `/ip`);
const findPing = (ip) => useAxios.get(`/ping?ip=${ip}`);
const signin = (data) => useAxios.post("/auth/signin", data);
const signup = (data) => useAxios.post("/auth/signup", data);
const users = () => {
    useAxios.defaults.headers.common["authtoken"] = localStorage.getItem("token")
    return useAxios.post("/auth/users");
}

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
