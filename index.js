//DEPENDENCIAS
import express from "express";
import  "dotenv/config";
import cors from 'cors';

// import request from "request";

//FUNCION DE LLAMADA
import { DB_URL, connect } from "./server/config/db.js";

//IMPORTACION DE RUTAS
import { instalacionesRoutes } from "./server/api/routes/instalaciones.routes.js";
import { userRoutes } from "./server/api/routes/users.routes.js";
import { reservasRoutes } from "./server/api/routes/reservas.routes.js";

//creo servidor express
const server = express();
//conectamos a traves de la funcion de mongo
connect();
//variable PORT de env
const PORT = process.env.PORT;



server.set("secretKey", "nodeRestApi"); 


// enviar datos por POST
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(cors('*'));
//server.use(request);


//RUTAS

server.use("/users", userRoutes);
server.use("/reservas", reservasRoutes);
server.use("/instalaciones", instalacionesRoutes);

server.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});
server.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Unexpected error');
});



server.listen(PORT, () => {
  //Escucho mi servidor en el puerto indicado
  (`Node server listening on port http://localhost:${PORT}`);
});
