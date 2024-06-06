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









export { getReservas };
