"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const validarJWT = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            exito: false,
            err: {
                message: "Se requiere el token...",
            },
        });
    }
    jwt.verify(token, `${process.env.JWT_KEY}`, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err,
            });
        }
        req.uid = decoded.uid;
        next();
    });
};
exports.default = validarJWT;
