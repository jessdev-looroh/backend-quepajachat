import { Request, Response, NextFunction } from "express";

import jwt = require("jsonwebtoken");

const validarJWT = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      exito: false,
      err: {
        message: "Se requiere el token...",
      },
    });
  }
  jwt.verify(token, `${process.env.JWT_KEY}`, (err:any, decoded:any) => {
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

export default validarJWT;
