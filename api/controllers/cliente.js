import { pool } from '../db.js';
import faker from 'faker';
import axios from 'axios';

export const getClientes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao obter clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const addCliente = async (req, res) => {
  const { nome, email, telefone } = req.body;

  // Gerar coordenadas aleatórias
  const coordenada_x = faker.address.longitude();
  const coordenada_y = faker.address.latitude();

  try {
    const result = await pool.query(
      'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, email, telefone, coordenada_x, coordenada_y]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao adicionar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


// Funções de validação de coordenadas
function isValidLatitude(latitude) {
  return latitude >= -90 && latitude <= 90;
}

function isValidLongitude(longitude) {
  return longitude >= -180 && longitude <= 180;
}

//Google Maps Directions API
export const getcalcularRota = async (req, res) => {
  try {
    // Obter as coordenadas de todos os clientes
    const result = await pool.query('SELECT coordenada_x, coordenada_y FROM clientes');
    const clientes = result.rows;

    // Adicione o console.log para verificar as coordenadas
    console.log('Coordenadas dos clientes:', clientes);

    // Verificar se há coordenadas suficientes
    if (clientes.length < 2) {
      console.error('Pelo menos duas coordenadas são necessárias para calcular a rota.');
      return res.status(400).json({ error: 'Pelo menos duas coordenadas são necessárias para calcular a rota.' });
    }

    // Formar a string de coordenadas para a requisição à API
    const origemFixa = '-23.651904,-46.549422';
    const destino = origemFixa;  // A rota deve retornar à origem
    const waypoints = clientes.map(cliente => `${cliente.coordenada_y.toFixed(6)},${cliente.coordenada_x.toFixed(6)}`).join('|');
    const coordenadas = `${origemFixa}|${waypoints}|${destino}`;

    // Fazer requisição à API do Google Maps Directions
    const apiKey = process.env.CHAVE_API_GOOGLE_MAPS;
    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origemFixa}&destination=${destino}&waypoints=${waypoints}&optimize=true&key=${apiKey}`;
    
    console.log('API URL:', apiUrl);
    console.log('Coordenadas enviadas para a API:', coordenadas);
    
    const response = await axios.get(apiUrl);

    // Adicione o console.log para verificar a resposta da API
    console.log('Resposta da API:', response.data);

    if (response.data.status === 'ZERO_RESULTS' || !response.data.routes || response.data.routes.length === 0) {
      console.error('Nenhuma rota encontrada.');
      return res.status(400).json({ error: 'Nenhuma rota encontrada.' });
    }

    const rota = response.data.routes[0];

    // Retornar a rota calculada
    res.json(rota);
  } catch (error) {
    console.error('Erro ao calcular a rota:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE clientes SET nome = $1, email = $2, telefone = $3, coordenada_x = $4, coordenada_y = $5 WHERE id = $6 RETURNING *',
      [nome, email, telefone, coordenada_x, coordenada_y, id]
    );
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Cliente não encontrado' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};


export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Cliente não encontrado' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

