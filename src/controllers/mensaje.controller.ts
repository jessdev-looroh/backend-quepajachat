import { Response, Request, json } from "express";
import Mensaje from "../models/mensaje.model";

class MensajeController {
  getMensajes(req: any, res: Response) {

    const miUid = req.uid;
    const deUid = req.params.de;
    

    Mensaje.find({'$or':[{de:miUid,para:deUid},{de:deUid,para:miUid}]})
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
export default usarioController;
