"use strict";
// api/usuarios
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarjwt_middleware_1 = __importDefault(require("../middlewares/validarjwt.middleware"));
const mensaje_controller_1 = __importDefault(require("../controllers/mensaje.controller"));
const mensajeRouter = express_1.Router();
mensajeRouter.get('/:de', validarjwt_middleware_1.default, mensaje_controller_1.default.getMensajes);
exports.default = mensajeRouter;
