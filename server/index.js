import express from "express";
import { createServer } from 'http';
import {  createServer as createViteServer  } from "vite";
import { createIOServer } from "./io.js";
import { Server } from 'socket.io';

const port = 3010;

async function createMainServer() {
  const app = express();
  const server = createServer(app);

  
  const io = new Server(server,{
    cors: {
      origin: '*',
    },
    transports: ['websocket'],
    pingInterval: 10000,
    pingTimeout: 5000,
  });
  
  createIOServer(io);

  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: {
        server
      }
    },
    appType: "spa"
  });

  app.use(vite.middlewares);

  app.use(express.static("static"));
  

  server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

createMainServer();