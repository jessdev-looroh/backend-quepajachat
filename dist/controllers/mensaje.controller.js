"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mensaje_model_1 = __importDefault(require("../models/mensaje.model"));
class MensajeController {
    getMensajes(req, res) {
        const miUid = req.uid;
        const deUid = req.params.de;
        mensaje_model_1.default.find({ '$or': [{ de: miUid, para: deUid }, { de: deUid, para: miUid }] })
            .sort("-createdAt")
            .limit(30)
            .exec((err, MensajesDB) => {
            if (err) {
                return res.status(500).json({
                    exito: false,
                    err,
                });
            }
            return res.json({
                exito: true,
                mensajes: MensajesDB,
            });
        });
    }
}
const usarioController = new MensajeController();
exports.default = usarioController;
