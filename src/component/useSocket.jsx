import { useMemo, useCallback } from "react";
import { io } from "socket.io-client";


export const SocketWs = () => {
    return io("ws://localhost:3001",{
            path: "/ws",
            transports: ["websocket", "polling", "webtransport"],
            cors: { origin: "*", credentials: true },
        })
} 

const UseSocket = () => {
    const socket = useMemo(() => SocketWs(), []);

    const emit = useCallback((event, data) => {
        socket.emit(event, data).connect();
    }, [socket]);

    const on = useCallback((event, callback) => {
        socket.on(event, callback).connect();
    }, [socket]);

    const off = useCallback((event, callback) => {
        socket.off(event, callback).disconnect();
    }, [socket]);

    const close = useCallback(() => {
        socket.close();
    }, [socket]);

    return {
        emit,
        on,
        off,
        close,
    };
} 

export default UseSocket;
