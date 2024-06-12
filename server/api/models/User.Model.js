import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  user: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  telefono: { type: String, required: false },
  rol: { type: String, enum: ['admin', 'cliente'], default: 'cliente' }
}, { timestamps: true });

const User = mongoose.model('User',usuarioSchema );

export { User }