// Controlador Reserva
import Reserva from '../models/Reserva.js';

export const list = async (req, res) => {
  const q = await Reserva.find().populate('cliente').populate('vehiculo').sort({ createdAt: -1 });
  res.json(q);
};

export const getOne = async (req, res) => {
  const x = await Reserva.findById(req.params.id).populate('cliente').populate('vehiculo');
  if (!x) return res.status(404).json({ message: 'No encontrado' });
  res.json(x);
};

export const create = async (req, res) => {
  try {
    const x = await Reserva.create(req.body); // {codigo, descripcion, cliente, vehiculo}
    const full = await Reserva.findById(x._id).populate('cliente').populate('vehiculo');
    res.status(201).json(full);
  } catch (e) {
    res.status(400).json({ message: 'Error de datos', error: e.message });
  }
};

export const update = async (req, res) => {
  const x = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .populate('cliente').populate('vehiculo');
  if (!x) return res.status(404).json({ message: 'No encontrado' });
  res.json(x);
};

export const remove = async (req, res) => {
  const x = await Reserva.findByIdAndDelete(req.params.id);
  if (!x) return res.status(404).json({ message: 'No encontrado' });
  res.json({ message: 'Eliminado' });
};
