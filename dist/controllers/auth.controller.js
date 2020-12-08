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
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
// import Usuario from "../models/usuario.model";
class LoginController {
    crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { nombre, password, email } = req.body;
            const salt = bcryptjs_1.default.genSaltSync();
            const usuario = new usuario_model_1.default({
                nombre,
                password: bcryptjs_1.default.hashSync(password, salt),
                email,
            });
            usuario.save((err, userNew) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    if (err["code"] === 11000) {
                        err.message = "Este email ya esta registrado.";
                        return res.status(400).json({
                            exito: false,
                            err: {
                                email: err.keyValue.email,
                                message: "Este email ya esta registrado.",
                            },
                        });
                    }
                    return res.status(500).json({
                        exito: false,
                        err,
                    });
                }
                const token = yield jwt_1.default.generarJWT(userNew.id);
                res.status(201).json({
                    exito: true,
                    token,
                    usuario: userNew,
                });
            }));
            // res.json({ exito: true, body:req.body });
        });
    }
    loginUsuario(req, res) {
        let { email, password } = req.body;
        usuario_model_1.default.findOne({ email: email }).exec((err, usuarioDB) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return res.status(500).json({
                    exito: false,
                    err,
                });
            }
            if (!usuarioDB) {
                return res.status(400).json({
                    exito: false,
                    err: {
                        message: "Credenciales icorrectas.",
                    },
                });
            }
            if (bcryptjs_1.default.compareSync(password, usuarioDB.password)) {
                const token = yield jwt_1.default.generarJWT(usuarioDB.id);
                usuarioDB.online = true;
                yield usuarioDB.save();
                return res.json({
                    exito: true,
                    usuario: usuarioDB,
                    token,
                });
            }
            else {
                return res.status(400).json({
                    exito: false,
                    err: {
                        message: "Credenciales incorrectas",
                    },
                });
            }
        }));
    }
    renewToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.uid;
            const token = yield jwt_1.default.generarJWT(uid);
            usuario_model_1.default.findById(uid, (err, usuarioDB) => {
                if (err) {
                    return res.status(500).json({
                        exito: false,
                        err,
                    });
                }
                if (!usuarioDB) {
                    return res.status(404).json({
                        exito: false,
                        err: {
                            message: "No existe un usuario con este UID",
                        },
                    });
                }
                res.json({ exito: true, usuario: usuarioDB, token });
            });
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
