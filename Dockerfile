# 1. Imagem base do Node.js
FROM node:20

# 2. Diretório de trabalho dentro do container Linux
WORKDIR /app

# 3. Copia o package.json e package-lock.json para instalar as dependências
COPY package.json ./

# 4. Instala todas as bibliotecas do projeto (Prisma, Express, TypeScript, etc.)
RUN npm install

# 5. Copia o restante dos arquivos do projeto
COPY . .

# 6. Informa qual porta a API utiliza
EXPOSE 3000

# 7. Comando para subir a aplicação
CMD ["npm", "start"]