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
  try {
    const { fecha } = req.params;
    //console.log(id);
    console.log(fecha);
    const reservaByDate = await Reservas.find({ fecha: fecha }).populate([{
      path: "instalacion", select: ""}]);
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

const addReserva = async (req, res, next) => {

  try {
    const NewReserva = new Reservas({
      nameClient: req.body.nameClient,
      numberIssue: req.body.numberIssue,
      //image: req.file_url,
      //imagen: req.file_url,
      type: req.body.type,
      concepto: req.body.concepto,
      price: req.body.price,
      iva: req.body.iva,
      priceFinal: req.body.priceFinal,
      date: req.body.date,
      //image: req.file_url,

      //tipo:req.body.tipo,
    });
    //console.log(NewGasto,'new');
    const newReservaDB = await NewReserva.save();
    return res.json({
      status: 201,
      message: httpStatusCode[201],
      data: { reservas: newReservaDB },
    });
  } catch (error) {
    return next(error);
  }
};









export { getReservas, getReservasByDate, addReserva };
