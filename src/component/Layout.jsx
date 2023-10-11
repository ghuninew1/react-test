import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UseUser } from "../store/DataContext";
import { IsData } from "./utils";
import PropTypes from "prop-types";
import GetData from "./GetData";

const Layout = ({ children }) => {
    const { userCheck } = UseUser();
    const token = localStorage.getItem("token");
    const users = localStorage.getItem("user");
    const [expires, setExpires] = useState(null);
    // const [connect, setConnect] = useState(false);

    useEffect(() => {
        return () => {
            if (IsData(users) && IsData(token)) {
                isConnect();
            } else {
                <Navigate to="/signin" replace={true} />;
            }
        };
    }, [token, users]);

    const isConnect = async () => {
        if (IsData(users) && IsData(token)) {
                const res = await GetData.users({ token });
                const tokensRes = res.data.tokens;
                if (tokensRes[0]?.token === token && new Date(tokensRes[0].expires) > new Date()) {
                    userCheck(res.data);
                    setExpires(new Date(tokensRes[0].expires));
                } else {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setExpires(null);
                    userCheck(null);
                    <Navigate to="/signin" replace={true} />;
                }
        }
    };

    if (IsData(users) && IsData(token)) {
        if (expires && expires > new Date()) {
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
