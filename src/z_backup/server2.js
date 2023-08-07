// const express = require('express');
// const {createServer} = require('http');
// const socketIO = require('socket.io');
// const ping = require('ping');
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import ping from "ping";


startServer();

async function startServer() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  const nodeData = [
    {
      id: 1,
      label: "Cloudflur",
      status: "up",
      ip: "1.0.0.1",
      time: "",
      lency: "",
    },
    {
      id: 2,
      label: "Dns.Google",
      status: "up",
      ip: "8.8.8.8",
      time: "",
      lency: "",
    },
    {
      id: 3,
      label: "test3",
      status: "up",
      ip: "192.168.0.1",
      time: "",
      lency: "",
    },
  ];
  let dataFetch = [
    { symbol: "BTCUSDT", price: 1000, time: 0 },
    { symbol: "ETHUSDT", price: 1000, time: 0 },
  ];
  const pingAndupdate = () => {
    Object.values(nodeData).forEach((node) => {
      const start = new Date();
      ping.sys.probe(node.ip, (isAlive) => {
        const updateStatus = isAlive ? "up" : "down";
        const isTime = Date.now() - start.getTime();
        io.emit("nodeStatus", {
          id: node.id,
          status: updateStatus,
          ip: node.ip,
          label: node.label,
          time: isTime,
          lency: isTime + "ms",
        });
      });
    });
  };

  const fetchData = () => {
    Object.values(dataFetch).forEach((node) => {
      const start = new Date();
      fetch(
        "https://api.binance.com/api/v3/ticker/price?symbols=%5B%22BTCUSDT%22%2C%22ETHUSDT%22%5D"
      )
        .then((res) => res.json())
        .then((data) => {
          dataFetch = data;
          io.emit("dataFetch", {
            symbol: node.symbol,
            price: node.price,
            time: Date.now() - start.getTime() + "ms",
          });
        })
        .catch((err) => console.log(err));
    });
  };
  app.get("/", (req, res) => {
    console.log("Hello World!");
    res.send("Welcome");
  });

  server.listen(3001, () => console.log("Example app listening on port 3001!"));

  setInterval(() => {
    pingAndupdate();
    fetchData();
  }, 10000);
}
