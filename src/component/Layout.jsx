import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UseUser } from "../store/DataContext";
import UseSocket from "./UseSocket";
import { IsData } from "./utils";

const Layout = ({ children }) => {
    const { userCheck } = UseUser();
    const token = localStorage.getItem("token");
    const users = localStorage.getItem("user");
    const [expires, setExpires] = useState(null);
    const socket = UseSocket();


    useEffect(() => {
        IsData(token) && IsData(users) && isConnect();
    }, [token, users]);


    const isConnect = () => {
        if (IsData(token) && IsData(users)) {
                socket.emit("currentuser", {
                    user: users,
                });
                socket.on("currentusered", (data) => {
                    const tokensRes = data.tokens;
                    if (
                        tokensRes[0]?.token === token &&
                        new Date(tokensRes[0].expires) > new Date()
                    ) {
                        userCheck(data);
                        setExpires(new Date(tokensRes[0].expires));
                    } else {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        setExpires(null);
                        userCheck(null);
                        socket.close();
                        <Navigate to="/signin" replace={true} />;
                    }
                });
        } 
    };

    if (IsData(users) && IsData(token)) {
        if (expires && expires > new Date()) {
            return children;
        }
    } else if (!IsData(users)  || !IsData(token)) {
        if (!IsData(token)) {
            return <Navigate to="/signin" replace={true} />;
        }
        if (expires && expires > new Date()) {
            return children;
        }
    }
};

export default Layout;
