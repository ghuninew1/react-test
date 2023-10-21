// import { useCallback } from "react";
import { io } from "socket.io-client";

export const UseSocket = () => {
    const socket = io(import.meta.env.VITE_API_WS_URL, {
        path: import.meta.env.VITE_API_WS_PATH,
        transports: ["websocket", "polling", "webtransport"],
        cors: { origin: "*", Credentials: true },
    });
    socket.on("connect", () => {
        console.log("connected");
        socket.on("disconnect", () => {
            console.log("disconnected");
        });
        socket.on("error", (err) => {
            console.log(err);
        });
    });
    
    return socket;
};

const socket = UseSocket();
export default socket;