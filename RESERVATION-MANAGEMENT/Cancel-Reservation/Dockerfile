# Usa una imagen base de Go 1.23.0 para construir la aplicación
FROM golang:1.23.0-alpine AS builder

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia archivos necesarios para manejar dependencias
COPY go.mod go.sum ./

# Descarga las dependencias de Go
RUN go mod download

# Copia el código fuente de la aplicación
COPY . .

# Copia el archivo .env al contenedor
COPY .env ./

# Compila la aplicación en un binario optimizado
RUN go build -o main .

# Usa una imagen base mínima para producción
FROM alpine:latest

# Instala certificados necesarios
RUN apk --no-cache add ca-certificates

# Copia el binario desde la fase de construcción
COPY --from=builder /app/main /usr/local/bin/main

# Copia el archivo .env al contenedor de producción (si es necesario)
COPY --from=builder /app/.env /app/.env

# Define el puerto de exposición
EXPOSE 3011

# Comando para ejecutar la aplicación
CMD ["/usr/local/bin/main"]
