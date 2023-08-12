import express from "express";
import { createServer } from "http";
import { createIOServer } from "./io.js";
import { Server } from "socket.io";
import { binanceapi } from "./bn.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  transports: ["websocket"],
});

startServer();
async function startServer() {
  createIOServer(io);
  binanceapi(io);
  await io.on("connection", (socket) => {
    console.log(`socket ${socket.id} connected`);

    socket.on("disconnect", (reason) => {
      console.log(`socket ${socket.id} disconnected due to ${reason}`);
    });
  });

  const port = process.env.PORT || 3001
  server.listen(port, (token) => {
    if (!token) {
      console.log(`Server running at http://localhost:${port}`)
    }
  });
}