import { Schema, model } from "mongoose";

const UsuarioSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, _id, password, ...others } = this.toObject();
  others.uid = _id;
  return others;
};

export default model("Usuario", UsuarioSchema);
