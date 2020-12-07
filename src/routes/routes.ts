import { Router } from 'express';
import routerLogin from './auth.route';


const rutas = Router();


rutas.use('/login',routerLogin);


export default rutas;