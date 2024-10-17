# Usar uma imagem oficial do Node.js como base
FROM node:18

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar todo o código da aplicação Angular para o diretório de trabalho
COPY . .

# Expor a porta 4200 para o servidor de desenvolvimento
EXPOSE 4200

# Comando para iniciar a aplicação no modo de desenvolvimento
CMD ["npm", "run", "start"]
