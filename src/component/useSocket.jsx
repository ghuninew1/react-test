import { useMemo } from "react";
import { io } from "socket.io-client";

const UseSocket = () => {
    const socket = useMemo(() => {
        if (import.meta.env.VITE_API_WS_URL) {
            return new io(import.meta.env.VITE_API_WS_URL, {
                path: import.meta.env.VITE_API_WS_PATH,
                transports: ["websocket", "polling", "webtransport"],
                cors: { origin: "*", Credentials: true },
            });
        } else {
            return new io("http://localhost:3001", {
                path: "/ws",
                transports: ["websocket", "polling", "webtransport"],
                cors: { origin: "*", Credentials: true },
            });
        }

    }, []);

        socket.on("connect", () => {
            console.log("connect: " , socket.id);
        } );
        socket.on("disconnect", (sw) => {
            console.log("disconnect: " , sw);
        });

    return { socket };
};

export default UseSocket;
