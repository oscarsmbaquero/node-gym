import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  user: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telefono: { type: String, required: false },
  localidad: { type: String, require: false},
  address: { type: String, require: false},
  cp: { type: String, require: false},
  provincia: { type: String, require: false},
  rol: { type: String, enum: ['admin', 'cliente'], default: 'cliente' },
  reservas: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
}, { timestamps: true });

const User = mongoose.model('User',usuarioSchema );

export { User }