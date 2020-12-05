"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const band_1 = __importDefault(require("../models/band"));
const bands_1 = __importDefault(require("../models/bands"));
const bands = new bands_1.default();
bands.addBand(new band_1.default("Queen"));
bands.addBand(new band_1.default("Heroes del silencio"));
bands.addBand(new band_1.default("Metallica"));
bands.addBand(new band_1.default("Seresencia"));
console.log(bands.getBands());
index_1.io.on("connect", (cliente) => {
    cliente.emit("getBandsList", bands.getBands());
    cliente.on("disconnect", () => {
        console.log("El usuario se desconecto");
    });
    cliente.on("votar", (data) => {
        let id = data.id;
        bands.voteBand(id);
        index_1.io.emit("getBandsList", bands.getBands());
    });
    cliente.on("enviarMensaje", (data) => {
        index_1.io.emit("enviarMensaje", { admin: data });
    });
    cliente.on("registrarBanda", (banda) => {
        let name = banda.nombre;
        bands.addBand(new band_1.default(name));
        index_1.io.emit("getBandsList", bands.getBands());
    });
    cliente.on("borrarBanda", (banda) => {
        let id = banda.id;
        bands.deleteBanda(id);
        index_1.io.emit("getBandsList", bands.getBands());
    });
});
