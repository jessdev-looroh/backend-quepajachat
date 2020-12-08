"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const usuario_route_1 = __importDefault(require("./usuario.route"));
const mensaje_route_1 = __importDefault(require("./mensaje.route"));
const rutas = express_1.Router();
rutas.use('/login', auth_route_1.default);
rutas.use('/usuario', usuario_route_1.default);
rutas.use('/mensaje', mensaje_route_1.default);
exports.default = rutas;
