"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const http = require("http");
const config_1 = __importDefault(require("./database/config"));
const routes_1 = __importDefault(require("./routes/routes"));
//CONFIGURACION DE LA RUTA DE LAS VARIABLES DE ENTORNO
let rutaConfig = path.resolve(__dirname, "./.env");
dotenv.config({ path: rutaConfig });
//DB CONFIG
config_1.default();
//CONFIGURACION DE LOS SOKETS
const socketIO = require("socket.io");
//CONFIGURACION DE EXPRESS
const app = express();
//Lectura y parseo del body
app.use(express.json());
app.use('/api', routes_1.default);
// app.use(express.urlencoded({extended:false}));
// app.use(cors())
//CONFIGURACION DE LA RUTA PUBLICA
let rutaPublic = path.resolve(__dirname, "./public");
app.use(express.static(rutaPublic));
//CREACION DEL SERVER CON SOCKETS
const server = http.createServer(app);
exports.io = socketIO(server);
require('./sockets/socket');
server.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto xd: ", process.env.PORT);
});
