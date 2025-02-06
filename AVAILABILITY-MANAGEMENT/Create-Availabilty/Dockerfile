# Imagen base
FROM golang:1.19

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Descargar dependencias
RUN go mod tidy

# Compilar la aplicación
RUN go build -o app

# Exponer el puerto 3007
EXPOSE 3007

# Comando para ejecutar la aplicación
CMD ["./app"]
