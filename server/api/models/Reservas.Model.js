import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reservaSchema = new Schema({
  instalacion: { type: Schema.Types.ObjectId, ref: 'Instalaciones', required: false },
  usuario: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
  fecha: { type: String, required: false },
  horaInicio: { type: String, required: false },
  horaFin: { type: String, required: false },
  estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' },
  n_usuario: { type: Number, required: false },
  usuarios_apuntados: { type: Number, required: false },
  //pista: [{ type: mongoose.Types.ObjectId, ref: 'instalaciones', required:false }],
}, { timestamps: true });


const Reservas = mongoose.model('Reservas', reservaSchema);

export { Reservas };
