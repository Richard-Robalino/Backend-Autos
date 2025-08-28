import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import clientesRoutes from './routes/clienteRoutes.js';
import vehiculosRoutes from './routes/vehiculoRoutes.js';
import reservasRoutes from './routes/reservaRoutes.js';

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN 
           ? process.env.CORS_ORIGIN.split(',') 
           : '*',  // permitir todos (temporal)
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ ok: true, name: 'renta-carros-api' }));

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/vehiculos', vehiculosRoutes);
app.use('/api/reservas', reservasRoutes);

const port = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(port, () => console.log(`🚀 API lista en http://localhost:${port}`));
});
