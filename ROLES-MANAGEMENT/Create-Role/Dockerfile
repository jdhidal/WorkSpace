# Usa una imagen oficial de Node.js como base
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu proyecto (package.json, package-lock.json, etc.) al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el código fuente de tu proyecto al contenedor
COPY . .

# Expone el puerto 3017 (el que está configurado en tu app)
EXPOSE 3017

# Comando para iniciar el microservicio
CMD ["npm", "start"]
