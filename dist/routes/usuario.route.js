"use strict";
// api/usuarios
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarjwt_middleware_1 = __importDefault(require("../middlewares/validarjwt.middleware"));
const usuario_controller_1 = __importDefault(require("../controllers/usuario.controller"));
const userRouter = express_1.Router();
userRouter.get('/', validarjwt_middleware_1.default, usuario_controller_1.default.getUsuarios);
exports.default = userRouter;
