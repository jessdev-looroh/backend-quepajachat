// path::api/login
import { Router, Request, Response } from "express";
import { check } from "express-validator";
import loginController from "../controllers/auth.controller";

import validarCampos from "../middlewares/validar.middleware";
import validarJWT from '../middlewares/validarjwt.middleware';

const routerLogin = Router();
routerLogin.post(
  "/new",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("nombre", "El nombre debe tener almenos 3 caracteres").isLength({
      min: 3,
    }),
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "Ingrese un email valido").isEmail(),
    check("password", "La contraseña es obligatorio").notEmpty(),
    check(
      "password",
      "La contraseña debe tener almenos 6 caracteres"
    ).isLength({ min: 6 }),
    // check('confirmPassword','Las contraseñas no coinciden').exists().custom((value,{req})=>value===req.body.password),
    validarCampos,
  ],
  loginController.crearUsuario
);

routerLogin.post(
  "/",
  [
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "Ingrese un email valido").isEmail(),
    check("password", "La contraseña es obligatorio").notEmpty(),
    check(
      "password",
      "La contraseña debe tener almenos 6 caracteres"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  loginController.loginUsuario
);

routerLogin.get('/renew',validarJWT ,loginController.renewToken);
export default routerLogin;
