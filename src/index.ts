import express = require("express");
import path = require("path");
import dotenv = require("dotenv");
import http = require("http");
const socketIO = require("socket.io");

let rutaConfig = path.resolve(__dirname, "./.env");
dotenv.config({ path: rutaConfig });

const app = express();

let rutaPublic = path.resolve(__dirname, "./public");
app.use(express.static(rutaPublic));

const server = http.createServer(app);
export const io: SocketIO.Server = socketIO(server);
require('./sockets/socket');



 
server.listen(process.env.PORT, () => {
  console.log("Escuchando el puerto xd: ", process.env.PORT);
});
