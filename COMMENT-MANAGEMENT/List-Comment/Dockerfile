# Usa una imagen base de Node.js
FROM node:20

# Define el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si existe) para instalar las dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación en el contenedor
COPY . .

# Expone el puerto en el que tu aplicación escuchará
EXPOSE 3016

# Comando para iniciar la aplicación
CMD ["node", "index.js"]
