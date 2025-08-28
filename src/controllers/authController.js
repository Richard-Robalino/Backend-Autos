import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import { isEmail } from '../utils/validators.js';

export const register = async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;
    if (!nombre || !apellido || !email || !password)
      return res.status(400).json({ message: 'Campos requeridos' });
    if (!isEmail(email)) return res.status(400).json({ message: 'Email inválido' });

    const exists = await Usuario.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email ya registrado' });

    const hash = await bcrypt.hash(password, 10);
    const user = await Usuario.create({ nombre, apellido, email, password: hash });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '2d' }
    );

    res.status(201).json({ token, user: { id: user._id, nombre, apellido, email } });
  } catch (e) {
    res.status(500).json({ message: 'Error servidor', error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '2d' }
    );

    res.json({ token, user: { id: user._id, nombre: user.nombre, apellido: user.apellido, email: user.email } });
  } catch (e) {
    res.status(500).json({ message: 'Error servidor', error: e.message });
  }
};

export const me = async (req, res) => {
  res.json({ user: { id: req.user.id, email: req.user.email } });
};
