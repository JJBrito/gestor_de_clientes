import express from 'express';
import {
  getClientes,
  addCliente,
  getcalcularRota,
  updateCliente,
  deleteCliente,
} from '../controllers/cliente.js';

const router = express.Router();

router.get('/clientes', getClientes);
router.post('/clientes', addCliente);
router.put('/clientes/:id', updateCliente);
router.delete('/clientes/:id', deleteCliente);
router.get('/calcular-rota', getcalcularRota);


export default router;
