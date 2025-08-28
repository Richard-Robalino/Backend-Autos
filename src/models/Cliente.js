// Modelo Cliente
import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema(
  {
    cedula: { type: String, required: true, unique: true, trim: true },
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    ciudad: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    direccion: { type: String, required: true, trim: true },
    telefono: { type: String, required: true, trim: true },
    fecha_nacimiento: { type: Date, required: true }
  },
  { timestamps: true }
);

//ClienteSchema.index({ cedula: 1 }, { unique: true });

export default mongoose.model('Cliente', ClienteSchema);
