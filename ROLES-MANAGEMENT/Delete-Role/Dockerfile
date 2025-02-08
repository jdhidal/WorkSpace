# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json antes de instalar dependencias
COPY package*.json ./

# Instala solo las dependencias de producción
RUN npm install --omit=dev

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto del microservicio
EXPOSE 3018

# Comando para iniciar el servidor
CMD ["npm", "start"]
