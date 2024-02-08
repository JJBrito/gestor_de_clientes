# Gerenciador de Clientes - Backend

Este é o repositório backend do projeto Gerenciador de Clientes, uma plataforma de gerenciamento de clientes desenvolvida como parte do Projeto Fullstack.

## Sobre o Projeto

O Gerenciador de Clientes é uma aplicação web que permite gerenciar clientes, exibindo-os em um mapa interativo e fornecendo funcionalidades como adicionar, editar e excluir clientes.

## Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL (como banco de dados)
- dotenv (para carregar variáveis de ambiente a partir de um arquivo .env)
- Axios (para fazer requisições HTTP)
- Cors (para habilitar o acesso a recursos de diferentes origens)
- Faker (para gerar dados fictícios)
- pg (para se comunicar com o banco de dados PostgreSQL)

## Estrutura de Arquivos

backend/
│
├── routes/
│ └── clientes.js
│
├── controllers/
│ └── cliente.js
│
├── db.js
├── index.js
├── .env
├── package.json
└── ...


## Como Executar o Projeto Localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com/JJBrito/gerenciador_de_clientes.git

## Instale as dependências do projeto:
cd backend
npm install


## Defina as variáveis de ambiente no arquivo .env:
PGUSER=postgres
PGHOST=localhost
PGPASSWORD=root
PGDATABASE=gclientdb
PGPORT=5432
PORT=3000

## Inicie o servidor:
npm start

O servidor será iniciado em http://localhost:3000

## Autor
Nome: José Junior
GitHub: https://github.com/JJBrito

## Licença
Este projeto está sob a licença MIT.

Este README.md fornece uma visão geral do projeto backend, incluindo uma descrição, as tecnologias utilizadas, a estrutura de arquivos, instruções para execução local e informações sobre o autor e a licença do projeto. Certifique-se de preencher as seções necessárias com as informações corretas antes de adicionar este arquivo ao seu repositório backend.

