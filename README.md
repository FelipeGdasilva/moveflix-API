# 🎬 MoveFlix API

 Uma API RESTful para gerenciamento e catálogo de filmes, desenvolvida com Node.js, Express, Prisma ORM e PostgreSQL durante o módulo de Back-end do curso DevQuest.

---

## 📌 Sobre o Projeto

A **MoveFlix API** foi construída para consolidar conceitos fundamentais de desenvolvimento Back-end, manipulando rotas HTTP, validação de regras de negócio e integração direta com banco de dados relacional.

### 🛠️ Funcionalidades
- [x] **Listar Filmes (`GET /movies`):** Retorna todos os filmes cadastrados no banco de dados.
- [x] **Cadastrar Filme (`POST /movies`):** Adiciona um novo filme com validações de dados (como datas e campos numéricos).
- [x] **Validação de Duplicidade:** Impede a inserção de filmes com o mesmo título (busca *case-insensitive*).
- [x] **Atualizar Filme (`PUT /movies/:id`):** Atualiza informações de um filme existente buscando pelo seu ID.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript no servidor
- **TypeScript** - Superset JavaScript com tipagem estática
- **Express** - Framework web para criação das rotas e APIs
- **Prisma 7 (`@prisma/client`)** - ORM moderno para comunicação com o banco
- **PostgreSQL (`@prisma/adapter-pg`)** - Banco de dados relacional
- **Thunder Client / Postman** - Testes e requisições HTTP

---

## ⚙️ Regras de Negócio e Tratamento de Erros

- **`201 Created`**: Retornado ao cadastrar um filme com sucesso.
- **`200 OK`**: Retornado ao listar ou atualizar filmes com sucesso.
- **`409 Conflict`**: Retornado quando há tentativa de cadastrar um filme que já possui o título registrado no banco.
- **`404 Not Found`**: Retornado ao tentar acessar ou atualizar uma rota com ID inexistente.
- **`500 Internal Server Error`**: Tratamento genérico de falhas internas no servidor com blocos `try/catch`.

---

## 🗄️ Modelo do Banco de Dados (Prisma Schema)

O banco contém a tabela principal `filmes` estruturada com os seguintes campos:

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `Int` | Chave primária (Autoincrement) |
| `titulo` | `String` | Nome do filme |
| `sinopse` | `String` | Breve descrição da história |
| `ano_lancamento` | `Int` | Ano de lançamento |
| `duracao_minutos` | `Int` | Duração em minutos |
| `categoria_id` | `Int` | ID de associação com a categoria |

---

## 💻 Como Rodar o Projeto na Sua Máquina

### Pré-requisitos
- **Node.js** instalado na sua máquina.
- Instância do **PostgreSQL** rodando (local ou na nuvem).

### Passo a passo

 1. **Clone o repositório:**
   ```bash
   git clone https://github.com/FelipeGdasilva/moveflix-API.git
   cd moveflix-API
   
 2. **Instale as dependências**
  ```bash
  npm install
  
 3. **Configure as variáveis de ambiente**
  ```bash
 Crie um arquivo .env na raiz do projeto com a URL do seu PostgreSQL
 DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"

 4. **Execute as migrações do Prisma (cria as tabelas no banco)**
 npx prisma migrate dev

 5. **Inicie o servidor**
 npm run dev


  
