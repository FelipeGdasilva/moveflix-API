# Moveflix API 🎬

API desenvolvida para o gerenciamento e listagem de filmes e categorias, integrada a um banco de dados PostgreSQL.

## 🚀 Tecnologias e Arquitetura Moderna

Este projeto foi construído utilizando as versões mais recentes das tecnologias de mercado, superando arquiteturas legadas:

- **Node.js (v24)** utilizando **ES Modules (`import/export`)** para um código moderno e nativo.
- **TypeScript** para tipagem estática e segurança durante o desenvolvimento.
- **Express** para gerenciamento de rotas e requisições HTTP de forma leve e rápida.
- **Prisma ORM (v7)**: Migrado com sucesso para a versão mais recente do Prisma, eliminando os gargalos das engines antigas em Rust.
- **Gerenciamento de Conexão com `@prisma/adapter-pg` e `pg`**: Em conformidade com a nova arquitetura do Prisma 7, a API utiliza um sistema de **Pool de Conexões** (piscina de conexões) gerenciado de forma eficiente através do driver nativo do PostgreSQL para Node.js, garantindo estabilidade e escalabilidade.

## 🛠️ Como rodar o projeto localmente

1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm installc