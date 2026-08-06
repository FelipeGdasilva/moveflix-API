import express from "express";
import { PrismaClient } from "@prisma/client";
import swaggerUi from "swagger-ui-express";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";
// Importa o arquivo JSON com a documentação do Swagger
import swaggerDocs from "../swagger.json" with { type: "json" };
// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();
const app = express();
// Middleware obrigatório para a API conseguir ler o JSON enviado no corpo das requisições
app.use(express.json());
// Middleware para servir a documentação do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
// 1. Listar todos os filmes (GET)
app.get("/movies", async (req, res) => {
    try {
        const movies = await prisma.filmes.findMany();
        return res.status(200).json(movies);
    }
    catch (error) {
        console.error("Erro ao buscar filmes:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});
// 2. Cadastrar um novo filme (POST)
app.post("/movies", async (req, res) => {
    try {
        const { titulo, sinopse, ano_lancamento, duracao_minutos, categoria_id } = req.body;
        const filmeExistente = await prisma.filmes.findFirst({
            where: {
                titulo: { equals: titulo, mode: "insensitive" },
            },
        });
        if (filmeExistente) {
            return res.status(400).json({ message: "Já existe um filme cadastrado com esse título!" });
        }
        const novoFilme = await prisma.filmes.create({
            data: {
                titulo: titulo,
                sinopse: sinopse,
                ano_lancamento: Number(ano_lancamento),
                duracao_minutos: Number(duracao_minutos),
                categoria_id: Number(categoria_id),
            },
        });
        return res.status(201).json(novoFilme);
    }
    catch (error) {
        console.error("Erro ao cadastrar filme:", error);
        return res.status(500).json({ error: "Erro interno ao cadastrar o filme" });
    }
});
// 3. Atualizar um filme existente (PUT)
app.put("/movies/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { titulo, sinopse, ano_lancamento, duracao_minutos, categoria_id } = req.body;
        const filmeAtualizado = await prisma.filmes.update({
            where: { id: id },
            data: {
                titulo: titulo,
                sinopse: sinopse,
                ano_lancamento: Number(ano_lancamento),
                duracao_minutos: Number(duracao_minutos),
                categoria_id: Number(categoria_id),
            },
        });
        return res.status(200).json(filmeAtualizado);
    }
    catch (error) {
        console.error("Erro ao atualizar filme:", error);
        return res.status(500).json({ error: "Erro ao atualizar o filme. Verifique se o ID existe!" });
    }
});
// 4. Remover um filme (DELETE)
app.delete("/movies/:id", async (req, res) => {
    const id = Number(req.params.id);
    try {
        const movie = await prisma.filmes.findUnique({
            where: { id },
        });
        if (!movie) {
            return res.status(404).send({ message: "Filme não encontrado" });
        }
        await prisma.filmes.delete({
            where: { id },
        });
        return res.status(200).send({ message: "Filme removido com sucesso" });
    }
    catch (error) {
        console.error("Erro ao remover filme:", error);
        return res.status(500).send({ message: "Falha ao remover o registro" });
    }
});
// 5. Filtrar filmes por categoria (GET)
app.get("/movies/category/:categoryId", async (req, res) => {
    const categoryId = Number(req.params.categoryId);
    try {
        const movies = await prisma.filmes.findMany({
            where: {
                categoria_id: categoryId,
            },
        });
        return res.status(200).send(movies);
    }
    catch (error) {
        console.error("Erro ao filtrar por categoria:", error);
        return res.status(500).send({ message: "Falha ao filtrar filmes por categoria" });
    }
});
// -------------------------------------------------------------------------
// INICIALIZAÇÃO DO SERVIDOR
// -------------------------------------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando redondinho na porta ${PORT}!`);
    console.log(`📄 Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});
