import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validarCampos = (req: Request, res: Response, next: NextFunction) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      exito: false,
      errors: errores.mapped(),
    });
  }
  next();
};

export default validarCampos;
