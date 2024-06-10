import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reservaSchema = new Schema({
  instalacion: { type: Schema.Types.ObjectId, ref: 'Instalacion', required: true },
  //tipo: { type: Schema.Types.ObjectId, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false },
  tipo: { type: Schema.Types.ObjectId, ref: 'Usuario', required: false },
  fecha: { type: String, required: false },
  horaInicio: { type: String, required: false },
  horaFin: { type: String, required: false },
  estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' },
  n_usuario: { type: Number, required: false },
  usuarios_apuntados: { type: Number, required: false }
}, { timestamps: true });


const Reservas = mongoose.model('Reservas', reservaSchema);

export { Reservas };
