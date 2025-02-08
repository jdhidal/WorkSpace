# Usar una imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json (si existe) al contenedor
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Exponer el puerto que usará la aplicación
EXPOSE 3020

# Definir el comando para ejecutar la aplicación
CMD ["node", "index.js"]
