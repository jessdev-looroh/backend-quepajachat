"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const jwt_1 = __importDefault(require("../helpers/jwt"));
const socket_controller_1 = __importDefault(require("../controllers/socket.controller"));
// import validarJWT from '../middlewares/validarjwt.middleware';
index_1.io.on("connect", (cliente) => {
    console.log("Usuario conectado");
    let token = cliente.handshake.headers["x-token"];
    let resp = jwt_1.default.comprobarJWT(token);
    let uid = resp[1];
    //VERIFICAR AUTENTICACION
    if (!resp[0]) {
        return cliente.disconnect();
    }
    socket_controller_1.default.usuarioConectado(uid);
    cliente.join(uid);
    cliente.on("enviarMensaje", (data) => __awaiter(void 0, void 0, void 0, function* () {
        let exito = yield socket_controller_1.default.grabarMensaje(data);
        console.log(exito);
        if (exito) {
            index_1.io.to(data.para).emit("enviarMensajePersonal", data);
        }
    }));
    // cliente.to(uid).emit('');
    cliente.on("disconnect", () => {
        socket_controller_1.default.usuarioDesonectado(resp[1]);
        console.log("El usuario se desconecto");
    });
    cliente.emit("bienvenida", "hola");
});
