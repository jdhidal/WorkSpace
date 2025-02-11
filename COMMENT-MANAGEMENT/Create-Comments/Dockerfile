# Utilizamos una imagen oficial de Node.js como base
FROM node:20

# Crear un directorio de trabajo para la aplicación
WORKDIR /usr/src/app

# Copiar los archivos de tu proyecto a la imagen de Docker
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto que usará la aplicación (en este caso 3015)
EXPOSE 3015

# Iniciar la aplicación
CMD ["node", "index.js"]
