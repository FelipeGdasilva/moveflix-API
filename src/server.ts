import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import express from "express";
import pg from "pg";

const app = express();

// 1. Cria a conexão direta usando o pacote 'pg'
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Cria o adaptador do Prisma 7
const adapter = new PrismaPg(pool);

// 3. Inicializa o Prisma passando o adaptador configurado
const prisma = new PrismaClient({ adapter });

app.use(express.json());

// Rota para listar os filmes
app.get("/movies", async (req, res) => {
  try {
    const movies = await prisma.filmes.findMany({
      orderBy: {
        titulo: "asc",
      },
      include: {
        categorias: true,
      },
    });

    res.json(movies);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando redondinho na porta ${PORT}!`);
});