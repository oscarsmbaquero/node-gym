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
    //(id);
    (fecha);
    const reservaByDate = await Reservas.find({ fecha: fecha }).populate([{ path: "instalacion", select: ""}])
    .populate([{ path: "usuario", select: "user"}])
    ;
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

const getReservasById = async (req, res, next) => {
  ('Entro al id');
  try {
    const { id } = req.params;
    const reservas = await Reservas.find({
      'usuario': { $in: [id] }
    }).populate([{ path: "instalacion", select: ""}]);
    return res.status(200).json(reservas);
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


//funciona se comenta para probar la otra 
const addReservaOld = async (req, res, next) => {
  try {
    const [horaInicio, horaFin] = req.body.reserva.hora.split('-');
    const NewReserva = new Reservas({
      fecha: req.body.reserva.date,
      horaInicio: horaInicio,
      horaFin:horaFin,
      instalacion: req.body.reserva.n_pista,
      usuario: req.body.reserva.nombre,
      n_usuario: 4,
      usuarios_apuntados: 1,
      //usuario: req.body.reserva.nombre,
    });
    (NewReserva,'new');
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
//funciona pero se comenta para probar añadir usuario
const addReserva = async (req, res, next) => {
  try {
    const [horaInicio, horaFin] = req.body.reserva.hora.split('-');
    const { date, n_pista, nombre, idPista } = req.body.reserva;
    // Buscar una reserva existente coincidente
    const existingReserva = await Reservas.findOne({
      fecha: date,
      instalacion: idPista,
      horaInicio: horaInicio,
      horaFin: horaFin
    });

    if (existingReserva) {
      (existingReserva);
      // Si la reserva existe, incrementar usuarios_apuntados en 1
      existingReserva.usuarios_apuntados += 1;
      await existingReserva.save();
      await Reservas.updateOne(
      { _id: existingReserva._id },
      { $push: { usuario: nombre } },
      { new: true }
    );
    await User.updateOne(
      { _id: nombre },
      { $push: { reservas: existingReserva._id } },
      { new: true }
    );

      return res.json({
        status: 200,
        message: "Reserva actualizada con éxito",
        data: { reservas: existingReserva },
      });
    } else {
      ('no existe esta reserva');
      // Si no existe, crear una nueva reserva
      const newReserva = new Reservas({
        fecha: req.body.reserva.date,
        horaInicio: horaInicio,
        horaFin:horaFin,
        instalacion: req.body.reserva.n_pista,
        usuario: req.body.reserva.nombre,
        n_usuario: 4,
        usuarios_apuntados: 1,
      });
      await User.updateOne(
        { _id: nombre },
        { $push: { reservas: newReserva._id } },
        { new: true }
      );
      (newReserva,'reserva');

      const newReservaDB = await newReserva.save();
      // await User.updateOne(
      //   { _id: existingReserva._id },
      //   { $push: { usuario: nombre } },
      //   { new: true }
      // );
      return res.json({
        status: 201,
        message: "Reserva creada con éxito",
        data: { reservas: newReservaDB },
      });
    }
  } catch (error) {
    return next(error);
  }
};










export { getReservas, getReservasByDate, addReserva, getReservasById };
