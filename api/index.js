import express from 'express';
import clienteRoutes from './routes/clientes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/clientes', cors());
app.use('/calcular-rota', cors());

app.use('/', clienteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});


