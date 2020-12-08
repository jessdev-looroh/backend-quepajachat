import Mensaje from "../models/mensaje.model";
import Usuario from "../models/usuario.model";

class SocketController {
  constructor() {
    console.log("Inicializa SOCKETCONTROLER");
  }
  async usuarioConectado(uid: string) {
    return Usuario.findById(uid, async (err: any, usuarioDB: any) => {
      usuarioDB.online = true;
      await usuarioDB.save();
      return usuarioDB;
    });
  }
  async usuarioDesonectado(uid: string) {
    return Usuario.findById(uid, async (err: any, usuarioDB: any) => {
      usuarioDB.online = false;
      await usuarioDB.save();
      return usuarioDB;
    });
  }

 async grabarMensaje(data: any){
    const mensaje = new Mensaje(data);
    await mensaje.save();
    return true;
  }
}

const socketController = new SocketController();
export default socketController;
