import { User } from "../models/User.Model.js";
import { httpStatusCode } from "../../utils/httpStatusCode.js";
import { Ventas } from "../models/Ventas.Model.js";
import nodemailer from "nodemailer";

const Orders = ('/', async (req, res, next) => {
  console.log('Entro');
   //const { userId, estado, avisoId, idUserOld } = req.body;
   try {
    const { userId } = req.params;
    console.log(userId);
    const pedidos = await Ventas.find().populate([{
      path: "userBuy", select: ""}]);
    return res.status(200).json(pedidos);
    //  return res.json({
    //   //  status : 200,
    //   //  message : httpStatusCode[200],
    //   data: { pedidos: pedidos },
    // });
   } catch (error) {
    return next(error);
   }
});
/**
 * cambiar el estado del envio
 */
//  const changeStateOrder =( '/', async (req, res, next) =>{
//   console.log('Entrosssss');
//   try {
//     const { id } = req.params;
//     console.log(id);  
//     const changeState = await Ventas.findByIdAndUpdate(
//       id,
//       { estadoPedido: "Cobrado" }
//     );



//   } catch (error) {
    
//   }
  

// });
const changeStateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { estado, mail } = req.body;  // Extrae el estado del cuerpo de la solicitud

    console.log(id, mail);  // Verifica que recibes correctamente la ID y el nuevo estado

    const changeState = await Ventas.findByIdAndUpdate(
      id,
      { estadoPedido: estado }, // Actualiza el estado con el nuevo valor
      { new: true } // Para obtener el documento actualizado
    );
    //enviamos el mail al cliente el cambiar el estado del pedido
    const config = {
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "oscarsmb@gmail.com",
        pass: "ewqt tsig kcdc pgjl",
      },
    };

    const mensaje = {
      from: "Coexist",
      to: mail,
      subject: `Pedido ${estado}` ,
      //text: `https://angular-e-commerce-ruby.vercel.app/user/new${token}`
      text: `Estimado cliente. Tu pedido ha sido ${estado}.Puedes consultarlo en tu Cuenta
      https://angular-e-commerce-ruby.vercel.app/client/account
      `
    };
    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);



    if (!changeState) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.status(200).json(changeState);
  } catch (error) {
    
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};





export { Orders, changeStateOrder };
