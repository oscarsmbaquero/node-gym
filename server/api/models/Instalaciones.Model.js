import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const instalacionSchema = new Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, enum: ['paddel', 'tennis', 'gymnasio'], required: true },
    // ubicacion: { type: String, required: true },
    // disponibilidad: [{
    //     dia: { type: String, required: true },
    //     horaInicio: { type: String, required: true },
    //     horaFin: { type: String, required: true }
    // }]
}, { timestamps: true });


const Instalaciones = mongoose.model('Instalaciones', instalacionSchema);

export { Instalaciones };
