import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UseUser } from "../store/DataContext";
import UseSocket from "./UseSocket";
import { IsData } from "./utils";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
    const { userCheck } = UseUser();
    const token = localStorage.getItem("token");
    const users = localStorage.getItem("user");
    const [expires, setExpires] = useState(null);
    const socket = UseSocket().socket;
    const [connect, setConnect] = useState(false);

    useEffect(() => {
        return () => {
            if (IsData(users) && IsData(token)) {
                setConnect(true);
                isConnect();
            } else {
                setConnect(false);
                <Navigate to="/signin" replace={true} />;
            } 
        }
    }, [token, users]);

    const isConnect = () => {
        
        if (IsData(users) && IsData(token)) {
            connect && socket.connect();
            socket.emit("currentuser", {
                user: users,
            });
            socket.on("currentusered", (data) => {
                const tokensRes = data.tokens;
                if (tokensRes[0]?.token === token && new Date(tokensRes[0].expires) > new Date()) {
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
            
            // setConnect(true);
            // isConnect && isConnect();
            return children;
        }
    } else {
        return <Navigate to="/signin" replace={true} />;
    }
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
