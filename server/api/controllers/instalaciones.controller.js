import { User } from "../models/User.Model.js";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Instalaciones } from "../models/Instalaciones.Model.js";
import nodemailer from "nodemailer";


const getInstalaciones = async (req, res, next) => {
  ('ehhhh');
  try {
    const instalaciones = await Instalaciones.find();
    return res.status(200).json(instalaciones);
  } catch (error) {
    return next(error);
  }
};

const getInstalacionesByType = async (req, res, next) => {
  ("Entro id   dscsdfsf");
  try {
    const { tipo } = req.params;
    (tipo);
    //(fecha);
    const pistasDisponibles = await Instalaciones.find({ tipo: tipo })

    return res.status(200).json(pistasDisponibles);
    // return res.json({
    //     status: 200,
    //     message: httpStatusCode[200],
    //     data: { jobs: jobbyid },
    // });
    //res.send(jobbyid);
  } catch (error) {
    return next(error);
  }
};









export { getInstalaciones, getInstalacionesByType };
