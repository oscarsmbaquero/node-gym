import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';
import {isAuth} from '../../authentication/jwt.js';

import { getReservas, getReservasByDate, addReserva, getReservasById } from '../controllers/reservas.controller.js';

 const reservasRoutes = express.Router();

 reservasRoutes.get('/', getReservas);
 reservasRoutes.get('/:fecha', getReservasByDate);
 reservasRoutes.get('/user/:id', getReservasById);
 reservasRoutes.post('/addReserva',addReserva);


export { reservasRoutes };