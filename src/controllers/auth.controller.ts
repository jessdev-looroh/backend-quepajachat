import { Request, Response } from "express";
import Usuario from "../models/usuario.model";
import bcryptjs from "bcryptjs";
import jwtHelper from "../helpers/jwt";
// import Usuario from "../models/usuario.model";

class LoginController {
  async crearUsuario(req: Request, res: Response) {
    let { nombre, password, email } = req.body;
    const salt = bcryptjs.genSaltSync();

    const usuario = new Usuario({
      nombre,
      password: bcryptjs.hashSync(password, salt),
      email,
    });

    usuario.save(async (err: any, userNew: any) => {
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
      const token = await jwtHelper.generarJWT(userNew.id);
      res.status(201).json({
        exito: true,
        token,
        usuario: userNew,
      });
    });

    // res.json({ exito: true, body:req.body });
  }

  loginUsuario(req: Request, res: Response) {
    let { email, password } = req.body;

    Usuario.findOne({ email: email }).exec(async (err, usuarioDB: any) => {
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
      if (bcryptjs.compareSync(password, usuarioDB.password)) {
        const token = await jwtHelper.generarJWT(usuarioDB.id);
        usuarioDB.online = true;
        await usuarioDB.save();
        return res.json({
          exito: true,
          usuario: usuarioDB,
          token,
        });
      } else {
        return res.status(400).json({
          exito: false,
          err: {
            message: "Credenciales incorrectas",
          },
        });
      }
    });
  }

  async renewToken(req: any, res: Response) {
    const uid = req.uid;
    const token = await jwtHelper.generarJWT(uid);

    Usuario.findById(uid, (err: any, usuarioDB: any) => {
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
      res.json({ exito: true, usuario:usuarioDB, token });
    });
  }
}

const loginController = new LoginController();
export default loginController;
