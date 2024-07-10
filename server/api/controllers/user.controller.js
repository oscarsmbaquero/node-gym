import { User } from "../models/User.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { httpStatusCode } from "../../utils/httpStatusCode.js";

//import sendMail from "./sendMail.js";
import nodemailer from "nodemailer";
const loginUser = async (req, res, next) => {
  try {
    const { body } = req;
    (body);
    // Comprobar email
    const user = await User.findOne({ mail: body.mail });
    // Comprobar password
    const isValidPassword = await bcrypt.compare(body.password, user.password);
    // Control de LOGIN
    if (!user || !isValidPassword) {
      const error = {
        status: 401,
        message: "The email & password combination is incorrect!",
      };
      return next(error);
    }

    // TOKEN JWT
    const token = jwt.sign(
      {
        id: user._id,
        user: user.user,
      },
      req.app.get("secretKey"),
      { expiresIn: "1h" }
    );

    // Response
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: {
        id: user._id,
        user: user.user,
        token: token,
        mail: user.mail,
        rol: user.rol,
      },
    });
  } catch (error) {
    (error);
    return next(error);
  }
};
const logoutUser = async (req, res, next) => {
  try {
    req.authority = null;
    return res.json({
      status: 200,
      message: "logged out",
      token: null,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

// const getUserActive = async (req, res, next) => {
//   try {
//     const users = await User.findById();
//     return res.status(200).json(users);
//   } catch (error) {
//     return next(error);
//   }
// };

const registerUser = async (req, res, next) => {

  console.log(req.body);
  debugger;
  try {
    const { body } = req;
    // Comprobar usuario
    const previousUser = await User.findOne({ mail: body.mail });
    if (previousUser) {
      const error = new Error("The user is already registered!");
      return next(error);
    }

    // Encriptar password
    const pwdHash = await bcrypt.hash(body.password, 10);
    // Crear usuario en DB
    const newUser = new User({
      user: body.user,
      tlf: body.tlf,
      mail: body.mail,
      address: body.address,
      localidad: body.localidad,
      provincia: body.provincia,
      cp: body.cp,
      password: pwdHash,
    });
    console.log(newUser);
    const savedUser = await newUser.save();

    // Respuesta
    return res.status(201).json({
      status: 201,
      message: httpStatusCode[201],
      data: {
        id: savedUser._id,
      },
    });
  } catch (error) {
    return next(error);
  }
};


// const OrderClient =("/", async (req, res, next) => {
//     try {
//       const { userId } = req.params;
//       (userId);
//       const userById = await User.findById(userId).populate([
//         { path: "numeroPedido", select: "" },
//       ]);
//       return res.json({
//         //  status : 200,
//         //  message : httpStatusCode[200],
//         data: { pedidos: userById },
//       });
//     } catch (error) {
//       return next(error);
//     }
//   });

// const getUserById = async (req, res, next) => {
//   ("Entro id");
//   try {
//     const { id } = req.params;
//     (id);
//     const userById = await User.findById(id);

//     return res.status(200).json(userById);
//     // return res.json({
//     //     status: 200,
//     //     message: httpStatusCode[200],
//     //     data: { jobs: jobbyid },
//     // });
//     //res.send(jobbyid);
//   } catch (error) {
//     return next(error);
//   }
// };

// const editUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const pilotModify = new User(req.body);
//     //Para evitar que se modifique el id de mongo:
//     //TODO******************rEVISAR
//     pilotModify._id = id;
//     const pilotUpdated = await User.findByIdAndUpdate(id, pilotModify);
//     return res.json({
//       status: 200,
//       message: httpStatusCode[200],
//       data: { pilot: pilotUpdated },
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// const getUserByMail = async (req, res, next) => {
//   try {
//     const { email } = req.params;
//     const userById = await User.findOne({ mail: email });
//     return res.status(200).json(userById);
//     // return res.json({
//     //     status: 200,
//     //     message: httpStatusCode[200],
//     //     data: { jobs: userById },
//     // });
//     //res.send(jobbyid);
//   } catch (error) {
//     return next(error);
//   }
// };

// const resetPassword = async (req, res, next) => {
//   ('entro');
//   try {
//     const { email } = req.params;
//     (email,'mail');
//     const newPassword = req.body.nuevaContrasena;
//     (newPassword,283);
//     const previousUser = await User.findOne({ mail: email });
//     (previousUser,285)
//     const pwdHash = await bcrypt.hash(newPassword, 10);

//     (pwdHash,previousUser,286)
//     //Para evitar que se modifique el id de mongo:
//     // pilotModify._id = id;
//     // const pilotUpdated = await User.findByIdAndUpdate(
//     //   id,
//     //   pilotModify
//     // );
//     // return res.json({
//     //   status: 200,
//     //   message: httpStatusCode[200],
//     //   data: { pilot: pilotUpdated },
//     // });
//   } catch (error) {
//     return next(error);
//   }
// };
// const resetPassword = async (req, res, next) => {
//   ("entro");

//   try {
//     const { email } = req.params;

//     const previousUser = await User.findOne({ mail: email });
//     // (previousUser, 285);
//     //await sendMail(email);
//     if (!previousUser) {
//       return res.status(404).json({
//         status: 404,
//         message: "Usuario no encontrado",
//       });
//     }
//     //const user = await User.findOne({ user: body.user });
//     const token = jwt.sign(
//       {
//         id: previousUser._id,
//         user: previousUser.user,
//       },
//       req.app.get("secretKey"),
//       { expiresIn: "1h" }
//     );
//     //envio de mail
//     const config = {
//       host: "smtp.gmail.com",
//       port: 587,
//       auth: {
//         user: "oscarsmb@gmail.com",
//         pass: "ewqt tsig kcdc pgjl",
//       },
//     };
//     const mensaje = {
//       from: "Coexist",
//       to: email,
//       subject: `Contraseña usuario ${previousUser.user}` ,
//       //text: `https://angular-e-commerce-ruby.vercel.app/user/new${token}`
//       text: `Hola  ${previousUser.user}. Adjuntamos enlace para recuperar tu contraseña.
//       Este enlace caduca en 1 hora.
//       https://angular-e-commerce-ruby.vercel.app/user/new/${token}.
//       Un saludo desde el equipo de Coexist`,
//     };

//     const transport = nodemailer.createTransport(config);

//     const info = await transport.sendMail(mensaje);
//     // return res.status(200).json({
//     //   status: 200,
//     //   message: 'Contraseña actualizada con éxito',
//     // });
//     return res.json({
//       status: 200,
//       message: httpStatusCode[200],
//       data: { previousUser: previousUser },
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

// const changePassword = async (req, res, next) => {
//   const id = req.params.id.toString(); // Convertir a cadena si es necesario
//   const nuevaContrasena = req.body.nuevaContrasena.toString(); // Convertir a cadena si es necesario
//    const userById = await User.findById(id);
//    const pwdHash = await bcrypt.hash(nuevaContrasena, 10);
//    userById.password = pwdHash;
//    await userById.save();
// };

export {
  loginUser,
  logoutUser,
  registerUser,
  // OrderClient,
  getUsers,
  // getUserById,
  // editUser,
  // getUserByMail,
  // resetPassword,
  // changePassword,
};
