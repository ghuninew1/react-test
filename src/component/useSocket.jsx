import { useMemo, useCallback } from "react";
import { io } from "socket.io-client";


export const SocketWs = () => {
    return io(import.meta.env.VITE_API_WS_URL,{
            path: import.meta.env.VITE_API_WS_PATH,
            transports: ["websocket", "polling", "webtransport"],
            cors: { origin: "*", credentials: true },
        })
} 

const UseSocket = () => {
    const socket = useMemo(() => SocketWs(), []);
    if (socket.connected) {
        socket.io.engine.on("upgrade", () => socket.connect());
    } else {
        socket.io.engine.off("upgrade");
    }

    const emit = useCallback((event, data) => {
        socket.emit(event, data).connect();
    }, [socket]);

    const on = useCallback((event, callback) => {
        socket.on(event, callback).connect();
    }, [socket]);

    const close = useCallback(() => {
        socket.close();
    }, [socket]);

    const off = useCallback((event, callback) => {
        socket.off(event, callback);
    } , [socket]);

    return useMemo(() => ({ emit, on, close, off }), [emit, on, close, off]);
}

export default UseSocket;
