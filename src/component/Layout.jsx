import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UseUser } from "../store/DataContext";
import UseSocket from "./useSocket";

const Layout = ({ children }) => {
    const { user, userCheck } = UseUser();
    const token = localStorage.getItem("token");
    const [expires, setExpires] = useState(null);
    const socket = UseSocket()
    
    useEffect(() => {
        if (token) {
            socket.emit("authenticate", { token });
            socket.on("authenticated", (users) => {
                socket.emit("currentuser", {
                    user: users.username,
                });

                socket.on("currentusered", (users) => {
                    const tokensRes = users.tokens;
                    if (
                        tokensRes[0]?.token === token &&
                        new Date(tokensRes[0].expires) > new Date()
                    ) {
                        userCheck(users);
                        setExpires(new Date(tokensRes[0].expires));
                    } else {
                        localStorage.removeItem("token");
                        setExpires(null);
                        userCheck(null);
                        socket.close();
                        <Navigate to="/signin" replace={true} />;
                    }
                });

            });

        } else {
            userCheck(null);
            socket.close();
            <Navigate to="/signin" replace={true} />;
        }
    }, [token, userCheck]);

    // if (expires) {
    //     console.log(
    //         "expires",
    //         expires > new Date(),
    //         "HOURS",
    //         (expires - new Date()) / 1000 / 60 / 60,
    //         "MINUTES",
    //         (expires - new Date()) / 1000 / 60,
    //         "SECONDS",
    //         (expires - new Date()) / 1000
    //     );
    // }

    if (user && token) {
        if (expires && expires > new Date()) {
            return children;
        } 
    } else
    if (!user || !token) {
        if (!user && !token) {
            return <Navigate to="/signin" replace={true} />;
        }
        if (expires && expires < new Date()) {
            return children;
        }
    }
};

export default Layout;
