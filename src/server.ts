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

// 2. Rota de Hoje: Cadastrar um novo filme (POST)
app.post("/movies", async (req, res) => {
  try {
    // Pegamos as variáveis que vêm do Thunder Client
    const { titulo, id_categoria, data_lancamento, quantidade_oscars } = req.body;

    const novoFilme = await prisma.filmes.create({
      data: {
        titulo: titulo,
        categoria_id: Number(id_categoria), // <- Ajustado aqui! Agora bate com o seu schema.prisma
        // O campo data_lancamento e quantidade_oscars não estão nesse seu modelo físico de filmes, 
        // mas se o seu Express precisar deles para outras regras, trate-os aqui se necessário.
      },
    });

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