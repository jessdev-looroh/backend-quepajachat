"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// path::api/login
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../controllers/auth"));
const routerLogin = express_1.Router();
routerLogin.post("/new", [
    express_validator_1.check('nombre', 'El nombre es obligatorio').not().isEmpty(),
], auth_1.default);
exports.default = routerLogin;
