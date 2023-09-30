import axios from "axios";

export const currentUser = async () =>
    await axios.post(
        import.meta.env.VITE_API_URL + "users",
        {},
        {
            headers: {
                authtoken: JSON.parse(localStorage.getItem("token")),
            },
        }
    );

