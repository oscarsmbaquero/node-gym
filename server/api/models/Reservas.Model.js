import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reservasSchema = new Schema({
  pista: { type: String, required: true },
  hora: { type: String, required: false },
  dia: { type: Number, required: false },
  plazas_disponibles: { type: Number, required: false },
},
{
  timestamps: true,
});


const Reservas = mongoose.model('Reservas', reservasSchema);

export { Reservas };
