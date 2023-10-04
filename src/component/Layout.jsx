import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UseUser } from "../store/DataContext";
import GetData from "./GetData";

// eslint-disable-next-line react/prop-types
const Layout = ({ children, login = false }) => {
    const user = UseUser().user;
    const {userCheck} = UseUser();
    const token = localStorage.getItem("token")
    const [tokens, setTokens] = useState(token);
    const [expires, setExpires] = useState(null);


    useEffect(() => {
        if (token) {
            feshData();
            setTokens(token);
        } else {
            localStorage.removeItem("token");
            setTokens(null);
            <Navigate to="/signin" replace={true} />;
        } 
        tokens ? feshData() : <Navigate to="/signin" replace={true} />;
    } , [token]);

    const feshData = async () => {
        try {
            const res = await GetData.users();
            if (res.data) {
                const tokensRes = res.data.tokens;
                if (tokensRes[0]?.token === token && new Date(tokensRes[0].expires) > new Date()) {
                    userCheck(res.data);
                    localStorage.setItem("token", tokensRes[0].token);
                    setTokens(tokensRes[0].token);
                    setExpires(new Date(tokensRes[0].expires));
                } else {
                    localStorage.removeItem("token");
                    setTokens(null);
                    setExpires(null);
                    <Navigate to="/signin" replace={true} />;
                } 
            } else {
                localStorage.removeItem("token");
                setTokens(null);
                setExpires(null);
                <Navigate to="/signin" replace={true} />;
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    // console.log("expires", expires > new Date() , "HOURS", (expires-new Date())/1000/60/60 , "MINUTES", (expires-new Date())/1000/60 , "SECONDS", (expires-new Date())/1000);
    if (login) {
        if (user) return <Navigate to="/" replace={true} />;
        if (expires > new Date() && user) return <Navigate  to="/" replace={true} />;
        if (expires > new Date() && !user) return children;
        if (expires <= new Date() || !user) return children;
        return children;
    }  
    if (!login) {
        if (expires > new Date() && user) return children;
        if (expires > new Date() && !user) return <Navigate to="/signin" replace={true} />;
        if (expires <= new Date()|| !user) return <Navigate to="/signin" replace={true} />;
        return children;
    }
    return children;
};

export default Layout;
