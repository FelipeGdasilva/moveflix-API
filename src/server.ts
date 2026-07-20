import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Middleware obrigatório para a API conseguir ler o JSON enviado pelo Thunder Client
app.use(express.json());

// -------------------------------------------------------------------------
// CONFIGURAÇÃO DE CONEXÃO DO PRISMA 7 (Piscina de Conexões)
// -------------------------------------------------------------------------
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// -------------------------------------------------------------------------
// ROTAS DA API
// -------------------------------------------------------------------------

// 1. Rota de Ontem: Listar todos os filmes (GET)
app.get("/movies", async (req, res) => {
  try {
    const movies = await prisma.filmes.findMany();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// 2. Rota de Hoje: Cadastrar um novo filme (POST) - Parte 2 Dinâmica
app.post("/movies", async (req, res) => {
  try {
    // Pegamos as informações que vêm do "frontend" (Thunder Client)
    // Deixei mapeado com os nomes em português para casar perfeitamente com seu banco!
    const { titulo, sinopse, ano_lancamento, duracao_minutos, categoria_id } = req.body;

    const novoFilme = await prisma.filmes.create({
      data: {
        titulo: titulo,
        sinopse: sinopse,
        ano_lancamento: Number(ano_lancamento),
        duracao_minutos: Number(duracao_minutos),
        categoria_id: Number(categoria_id), // Garante que vai como número inteiro para o banco
      },
    });

    // Retorna o filme criado com status 201 (Created)
    res.status(201).json(novoFilme);
  } catch (error) {
    console.error("Erro ao cadastrar filme:", error);
    res.status(500).json({ error: "Erro interno ao cadastrar o filme" });
  }
});

// -------------------------------------------------------------------------
// INICIALIZAÇÃO DO SERVIDOR
// -------------------------------------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando redondinho na porta ${PORT}!`);
});