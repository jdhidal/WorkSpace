FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de la aplicación
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install --legacy-peer-deps

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto del microservicio
EXPOSE 3010

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
