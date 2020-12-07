"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// path::api/login
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validar_middleware_1 = __importDefault(require("../middlewares/validar.middleware"));
const validarjwt_middleware_1 = __importDefault(require("../middlewares/validarjwt.middleware"));
const routerLogin = express_1.Router();
routerLogin.post("/new", [
    express_validator_1.check("nombre", "El nombre es obligatorio").notEmpty(),
    express_validator_1.check("nombre", "El nombre debe tener almenos 3 caracteres").isLength({
        min: 3,
    }),
    express_validator_1.check("email", "El email es obligatorio").notEmpty(),
    express_validator_1.check("email", "Ingrese un email valido").isEmail(),
    express_validator_1.check("password", "La contraseña es obligatorio").notEmpty(),
    express_validator_1.check("password", "La contraseña debe tener almenos 6 caracteres").isLength({ min: 6 }),
    // check('confirmPassword','Las contraseñas no coinciden').exists().custom((value,{req})=>value===req.body.password),
    validar_middleware_1.default,
], auth_controller_1.default.crearUsuario);
routerLogin.post("/", [
    express_validator_1.check("email", "El email es obligatorio").notEmpty(),
    express_validator_1.check("email", "Ingrese un email valido").isEmail(),
    express_validator_1.check("password", "La contraseña es obligatorio").notEmpty(),
    express_validator_1.check("password", "La contraseña debe tener almenos 6 caracteres").isLength({ min: 6 }),
    validar_middleware_1.default,
], auth_controller_1.default.loginUsuario);
routerLogin.get('/renew', validarjwt_middleware_1.default, auth_controller_1.default.renewToken);
exports.default = routerLogin;
