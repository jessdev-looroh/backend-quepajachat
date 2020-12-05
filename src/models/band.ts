import { v4 as uuidV4 } from "uuid";
export default class Band {
  name: string;
  vote: number;
  id: string;
  constructor(name = "no-name") {
    this.id = uuidV4(); //IDENTIFICADOR ÚNICO
    this.name = name;
    this.vote = 0;
  }
}
