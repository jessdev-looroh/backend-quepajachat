import { io } from "../index";
import jwtHelper from "../helpers/jwt";
import socketController from "../controllers/socket.controller";

// import validarJWT from '../middlewares/validarjwt.middleware';

io.on("connect", (cliente) => {
  console.log("Usuario conectado");
  let token = cliente.handshake.headers["x-token"];
  let resp = jwtHelper.comprobarJWT(token) as any;
  let uid = resp[1];
  //VERIFICAR AUTENTICACION
  if (!resp[0]) {
    return cliente.disconnect();
  }

  socketController.usuarioConectado(uid);
  cliente.join(uid);

  cliente.on("enviarMensaje", async (data) => {
    let exito = await socketController.grabarMensaje(data);
    console.log(exito);
    if (exito) {
      io.to(data.para).emit("enviarMensajePersonal", data);
    }
  });
  // cliente.to(uid).emit('');

  cliente.on("disconnect", () => {
    socketController.usuarioDesonectado(resp[1]);
    console.log("El usuario se desconecto");
  });
  cliente.emit("bienvenida", "hola");
});
