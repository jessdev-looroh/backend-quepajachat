import jwt from "jsonwebtoken";

class JwtHelper {
  constructor(){
    console.log("Se inicializa el JWTHeLPER");
  }
  generarJWT = (uid: String) => {
    return new Promise((resolve, reject) => {
      const payload = { uid };
      jwt.sign(
        payload,
        `${process.env.JWT_KEY}`,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            reject("No se pudo generar el JWT");
          } else {
            resolve(token);
          }
        }
      );
    });
  };

  comprobarJWT = (token: string) => {
    return jwt.verify(
      token,
      `${process.env.JWT_KEY}`,
      (err: any, decoded: any) => {
        if (err) {
          return [false, err];
        }
        const uid = decoded.uid;
        return [true, uid];
      }
    );
  };
}

const jwtHelper = new JwtHelper();
export default jwtHelper;
