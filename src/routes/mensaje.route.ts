// api/usuarios

import { Router } from 'express';
import validarJWT from '../middlewares/validarjwt.middleware';
import mensajeController from '../controllers/mensaje.controller';


const mensajeRouter = Router();
mensajeRouter.get('/:de',validarJWT,mensajeController.getMensajes);



export default mensajeRouter;