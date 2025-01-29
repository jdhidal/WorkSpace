# Usamos una imagen base de Go
FROM golang:1.18-alpine

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY . .

# Descargar las dependencias del proyecto (esto también maneja la creación de los binarios de Go)
RUN go mod tidy

# Exponer el puerto en el que se ejecutará el servidor (ajusta según el puerto que uses)
EXPOSE 3010

# Construir la aplicación Go
RUN go build -o main .

# Comando para ejecutar el servidor Go
CMD ["./main"]
