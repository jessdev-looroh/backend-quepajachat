"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
index_1.io.on("connect", (cliente) => {
    cliente.on("disconnect", () => {
        console.log("El usuario se desconecto");
    });
});
