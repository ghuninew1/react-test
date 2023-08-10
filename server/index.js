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
  pingInterval: 10000,
  pingTimeout: 5000,
});

createIOServer(io);
binanceapi(io);
io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

server.listen(3000, (token) => {
  if (!token) {
    console.warn("port already in use");
  }
});
