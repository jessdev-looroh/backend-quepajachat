import Band from "./band";
export default class Bands {
  bands: Band[];
  constructor() {
    this.bands = [];
  }
  addBand(band = new Band()) {
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
      if (b.id === id) b.vote++;
      return b;
    });
  }


}
