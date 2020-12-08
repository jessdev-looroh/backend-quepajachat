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
const mensaje_model_1 = __importDefault(require("../models/mensaje.model"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
class SocketController {
    constructor() {
        console.log("Inicializa SOCKETCONTROLER");
    }
    usuarioConectado(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return usuario_model_1.default.findById(uid, (err, usuarioDB) => __awaiter(this, void 0, void 0, function* () {
                usuarioDB.online = true;
                yield usuarioDB.save();
                return usuarioDB;
            }));
        });
    }
    usuarioDesonectado(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return usuario_model_1.default.findById(uid, (err, usuarioDB) => __awaiter(this, void 0, void 0, function* () {
                usuarioDB.online = false;
                yield usuarioDB.save();
                return usuarioDB;
            }));
        });
    }
    grabarMensaje(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const mensaje = new mensaje_model_1.default(data);
            yield mensaje.save();
            return true;
        });
    }
}
const socketController = new SocketController();
exports.default = socketController;
