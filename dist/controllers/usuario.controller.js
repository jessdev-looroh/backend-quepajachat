"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
class UsuarioController {
    getUsuarios(req, res) {
        console.log(req.uid);
        usuario_model_1.default.find({ _id: { $ne: req.uid } })
            .sort("-online")
            .exec((err, usuariosDB) => {
            if (err) {
                return res.status(500).json({
                    exito: false,
                    err,
                });
            }
            return res.json({
                exito: true,
                usuarios: usuariosDB,
            });
        });
    }
}
const usarioController = new UsuarioController();
exports.default = usarioController;
