# Usa una imagen base oficial de Node.js
FROM node:16

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el código fuente del proyecto al contenedor
COPY . .

# Expone el puerto en el que el microservicio está corriendo
EXPOSE 3019

# Define la variable de entorno para usar el archivo .env
ENV NODE_ENV=production

# Comando para iniciar el servidor cuando el contenedor se ejecute
CMD ["node", "server.js"]
