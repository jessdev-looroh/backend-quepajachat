"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const http = require("http");
const socketIO = require("socket.io");
let rutaConfig = path.resolve(__dirname, "./.env");
dotenv.config({ path: rutaConfig });
const app = express();
let rutaPublic = path.resolve(__dirname, "./public");
app.use(express.static(rutaPublic));
const server = http.createServer(app);
exports.io = socketIO(server);
require('./sockets/socket');
server.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto xd: ", process.env.PORT);
});
