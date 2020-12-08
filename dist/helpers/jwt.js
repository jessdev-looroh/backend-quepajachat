"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtHelper {
    constructor() {
        this.generarJWT = (uid) => {
            return new Promise((resolve, reject) => {
                const payload = { uid };
                jsonwebtoken_1.default.sign(payload, `${process.env.JWT_KEY}`, { expiresIn: "24h" }, (err, token) => {
                    if (err) {
                        reject("No se pudo generar el JWT");
                    }
                    else {
                        resolve(token);
                    }
                });
            });
        };
        this.comprobarJWT = (token) => {
            return jsonwebtoken_1.default.verify(token, `${process.env.JWT_KEY}`, (err, decoded) => {
                if (err) {
                    return [false, err];
                }
                const uid = decoded.uid;
                return [true, uid];
            });
        };
        console.log("Se inicializa el JWTHeLPER");
    }
}
const jwtHelper = new JwtHelper();
exports.default = jwtHelper;
