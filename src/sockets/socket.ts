import { io } from "../index";
import Band from "../models/band";
import Bands from "../models/bands";

const bands = new Bands();
bands.addBand(new Band("Queen"));
bands.addBand(new Band("Heroes del silencio"));
bands.addBand(new Band("Metallica"));
bands.addBand(new Band("Seresencia"));
console.log(bands.getBands());
io.on("connect", (cliente) => {
  cliente.emit("getBandsList", bands.getBands());
  cliente.on("disconnect", () => {
    console.log("El usuario se desconecto");
  });

  cliente.on("votar", (data) => {
    let id = data.id;
    bands.voteBand(id);
    io.emit("getBandsList", bands.getBands());
  });
  cliente.on("enviarMensaje", (data) => {
    io.emit("enviarMensaje", { admin: data });
  });
  cliente.on("registrarBanda", (banda) => {
    let name = banda.nombre;
    bands.addBand(new Band(name));
    io.emit("getBandsList", bands.getBands());
  });
  cliente.on("borrarBanda", (banda) => {
    let id = banda.id;
    bands.deleteBanda(id);
    io.emit("getBandsList", bands.getBands());

  });
});
