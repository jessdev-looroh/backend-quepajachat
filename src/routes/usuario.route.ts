// api/usuarios

import { Router } from 'express';
import validarJWT from '../middlewares/validarjwt.middleware';
import usarioController from '../controllers/usuario.controller';


const userRouter = Router();
userRouter.get('/',validarJWT,usarioController.getUsuarios);



export default userRouter;