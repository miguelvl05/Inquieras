FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# --host hace que Vite escuche fuera del contenedor
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
