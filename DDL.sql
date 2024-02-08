-- Criar a tabela de clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
	coordenada_x FLOAT,
    coordenada_y FLOAT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);