"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const band_1 = __importDefault(require("./band"));
class Bands {
    constructor() {
        this.bands = [];
    }
    addBand(band = new band_1.default()) {
        this.bands.push(band);
    }
    getBands() {
        return this.bands;
    }
    deleteBanda(id = "") {
        this.bands = this.bands.filter((b) => b.id !== id);
        return this.bands;
    }
    voteBand(id = "") {
        this.bands = this.bands.map((b) => {
            if (b.id === id)
                b.vote++;
            return b;
        });
    }
}
exports.default = Bands;
