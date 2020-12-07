import jsw from "jsonwebtoken";

const generarJWT = (uid: String) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jsw.sign(
      payload,
      `${process.env.JWT_KEY}`,{expiresIn: "24h"},
      (err, token) => {
        if (err) {
          reject('No se pudo generar el JWT');
        } else {
          resolve(token);
        }
      }
    );
  });
};

export default generarJWT;
