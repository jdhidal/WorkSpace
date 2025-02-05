# Usa una imagen ligera de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código al contenedor
COPY . .

# Expone el puerto en el que corre el microservicio
EXPOSE 3017

# Comando para ejecutar el servidor
CMD ["node", "src/server.js"]
