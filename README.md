# Plataforma de Gerenciamento de Clientes

Bem-vindo à Plataforma de Gerenciamento de Clientes! Este é um projeto Fullstack que visa oferecer uma solução para gerenciar clientes de forma eficiente e visualmente atraente.

## Visão Geral

A Plataforma de Gerenciamento de Clientes é uma aplicação web que permite aos usuários gerenciar clientes de forma fácil e intuitiva. A aplicação consiste em duas partes principais: o frontend e o backend.

### Frontend

O frontend é a interface com o usuário, onde os clientes são exibidos em um mapa interativo e as operações de adição, edição e exclusão de clientes são realizadas. A interface do usuário é desenvolvida usando React.js e Styled Components, fornecendo uma experiência moderna e responsiva.

### Backend

O backend é responsável por fornecer dados para o frontend e realizar operações no banco de dados. Ele é desenvolvido em Node.js com o framework Express.js e se comunica com um banco de dados PostgreSQL para armazenar informações sobre os clientes. Além disso, o backend utiliza a biblioteca dotenv para carregar variáveis de ambiente a partir de um arquivo .env e garantir a segurança das informações sensíveis.

## Funcionalidades Principais

- Visualização dos clientes em um mapa interativo.
- Adição de novos clientes com nome, email, telefone e data de cadastro.
- Edição dos dados de clientes existentes.
- Exclusão de clientes.
- Cálculo automático da rota otimizada para visitar todos os clientes, utilizando a API do Google Maps Directions.

## Como Executar o Projeto Localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com/JJBrito/gerenciador_de_clientes.git


## Navegue até o diretório do backend e instale as dependências:
cd backend
npm install

## Defina as variáveis de ambiente no arquivo .env no diretório do backend.
## Inicie o servidor backend:
npm start

## Navegue até o diretório do frontend e instale as dependências:
cd frontend
npm install

## Inicie o servidor frontend:
npm start


Acesse a aplicação em http://localhost:3000 no seu navegador

## Autor
Nome: José Junior
GitHub: https://github.com/JJBrito

## Licença
Este projeto está sob a licença MIT.

Este README.md fornece uma visão geral do seu projeto Fullstack de Plataforma de Gerenciamento de Clientes, incluindo uma descrição, as tecnologias utilizadas, as funcionalidades principais, instruções para execução local e informações sobre o autor e a licença do projeto. Certifique-se de preencher as seções necessárias com as informações corretas antes de adicionar este arquivo ao seu repositório.



