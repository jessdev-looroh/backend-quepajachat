import { io } from "../index";

io.on("connect", (cliente) => {
  cliente.on("disconnect", () => {
    console.log("El usuario se desconecto");
  });



});
