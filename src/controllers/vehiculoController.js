// Controlador Vehiculo
import Vehiculo from '../models/Vehiculo.js';

export const list = async (req, res) => {
  const q = await Vehiculo.find().sort({ createdAt: -1 });
  res.json(q);
};

export const getOne = async (req, res) => {
  const x = await Vehiculo.findById(req.params.id);
  if (!x) return res.status(404).json({ message: 'No encontrado' });
  res.json(x);
};

export const create = async (req, res) => {
  try {
    const x = await Vehiculo.create(req.body);
    res.status(201).json(x);
  } catch (e) {
    res.status(400).json({ message: 'Error de datos', error: e.message });
  }
};

export const update = async (req, res) => {
  const x = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!x) return res.status(404).json({ message: 'No encontrado' });
  res.json(x);
};

export const remove = async (req, res) => {
  const x = await Vehiculo.findByIdAndDelete(req.params.id);
  if (!x) return res.status(404).json({ message: 'No encontrado' });
  res.json({ message: 'Eliminado' });
};
