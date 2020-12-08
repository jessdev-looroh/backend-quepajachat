import { Response, Request, json } from "express";
import Usuario from "../models/usuario.model";

class UsuarioController {
  getUsuarios(req: any, res: Response) {
    console.log(req.uid);
    Usuario.find({_id: { $ne: req.uid } })
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
export default usarioController;
