// Modelo Vehiculo
import mongoose from 'mongoose';

const VehiculoSchema = new mongoose.Schema(
  {
    marca: { type: String, required: true, trim: true },
    modelo: { type: String, required: true, trim: true },
    anio_fabricacion: { type: Number, required: true },
    placa: { type: String, required: true, unique: true, uppercase: true, trim: true },
    color: { type: String, required: true, trim: true },
    tipo_vehiculo: { type: String, required: true, trim: true },
    kilometraje: { type: Number, required: true, min: 0 },
    descripcion: { type: String, default: '' }
  },
  { timestamps: true }
);

//VehiculoSchema.index({ placa: 1 }, { unique: true });

export default mongoose.model('Vehiculo', VehiculoSchema);
