import { Router } from 'express';
import routerLogin from './auth.route';
import userRouter from './usuario.route';
import mensajeRouter from './mensaje.route';


const rutas = Router();


rutas.use('/login',routerLogin);
rutas.use('/usuario',userRouter);
rutas.use('/mensaje',mensajeRouter);


export default rutas;