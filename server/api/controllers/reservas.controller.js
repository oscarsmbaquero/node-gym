import { User } from "../models/User.Model.js";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Reservas } from "../models/Reservas.Model.js";
import nodemailer from "nodemailer";


const getReservas = async (req, res, next) => {
  try {
    const reservas = await Reservas.find();
    return res.status(200).json(reservas);
  } catch (error) {
    return next(error);
  }
};

const getReservasByDate = async (req, res, next) => {
  console.log("Entro id   dscsdfsf");
  try {
    const { fecha } = req.params;
    //console.log(id);
    console.log(fecha);
    const reservaByDate = await Reservas.find({ fecha: fecha })
    //.populate({ path: "materialIntervencion",select: "descripcion"})

    return res.status(200).json(reservaByDate);
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









export { getReservas, getReservasByDate };
