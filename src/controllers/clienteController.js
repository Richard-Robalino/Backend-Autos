// Controlador Cliente
import Cliente from '../models/Cliente.js';

export const list = async (req, res) => {
  const q = await Cliente.find().sort({ createdAt: -1 });
  res.json(q);
};

export const getOne = async (req, res) => {
  const x = await Cliente.findById(req.params.id);
  if (!x) return res.status(404).json({ message: 'No encontrado' });
  res.json(x);
};

export const create = async (req, res) => {
  try {
    const x = await Cliente.create(req.body);
    res.status(201).json(x);
  } catch (e) {
    res.status(400).json({ message: 'Error de datos', error: e.message });
  }
};

export const update = async (req, res) => {
  const x = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!x) return res.status(404).json({ message: 'No encontrado' });
  res.json(x);
};

export const remove = async (req, res) => {
  const x = await Cliente.findByIdAndDelete(req.params.id);
  if (!x) return res.status(404).json({ message: 'No encontrado' });
  res.json({ message: 'Eliminado' });
};
