import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';
import {isAuth} from '../../authentication/jwt.js';

import { getInstalaciones, getInstalacionesByType } from '../controllers/instalaciones.controller.js';

 const instalacionesRoutes = express.Router();

 instalacionesRoutes.get('/', getInstalaciones);
 instalacionesRoutes.get('/:tipo', getInstalacionesByType);


export { instalacionesRoutes };