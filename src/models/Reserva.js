// models/Reserva.js
import mongoose from 'mongoose';

const ReservaSchema = new mongoose.Schema(
  {
    codigo: { type: String, required: true, unique: true, trim: true },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    vehiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehiculo', required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Reserva', ReservaSchema);
