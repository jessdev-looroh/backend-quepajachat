import express = require("express");
import path = require("path");
import dotenv = require("dotenv");
import http = require("http");
import dbConnection from "./database/config";
import rutas from "./routes/routes";
//CONFIGURACION DE LA RUTA DE LAS VARIABLES DE ENTORNO
let rutaConfig = path.resolve(__dirname, "./.env");
dotenv.config({ path: rutaConfig });

//DB CONFIG
dbConnection();

//CONFIGURACION DE LOS SOKETS
const socketIO = require("socket.io");


//CONFIGURACION DE EXPRESS
const app = express();

//Lectura y parseo del body

app.use(express.json());
app.use('/api',rutas);
// app.use(express.urlencoded({extended:false}));
// app.use(cors())

//CONFIGURACION DE LA RUTA PUBLICA
let rutaPublic = path.resolve(__dirname, "./public");
app.use(express.static(rutaPublic));


//CREACION DEL SERVER CON SOCKETS
const server = http.createServer(app);
export const io: SocketIO.Server = socketIO(server);
require('./sockets/socket');



 
server.listen(process.env.PORT, () => {
  console.log("Escuchando el puerto xd: ", process.env.PORT);
});
