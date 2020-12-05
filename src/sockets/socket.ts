import { io } from '../index';
io.on("connect", (cliente) => {
  console.log("Se conecto un usuario");
  cliente.on("disconnect", () => {
    console.log("El usuario se desconecto");
  });
  cliente.on("enviarMensaje", (data) => {
    console.log("Mensaje: ", data);
    io.emit("enviarMensaje", { admin: "nuevo mensaje" });
  });
});
