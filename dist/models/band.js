"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Band {
    constructor(name = "no-name") {
        this.id = uuid_1.v4(); //IDENTIFICADOR ÚNICO
        this.name = name;
        this.vote = 0;
    }
}
exports.default = Band;
