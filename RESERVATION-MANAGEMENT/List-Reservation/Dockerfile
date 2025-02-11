# Usa una imagen base de Go 1.21
FROM golang:1.21-alpine AS builder

# Configura el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el go.mod y go.sum y descarga las dependencias
COPY go.mod go.sum ./
RUN go mod download

# Copia el archivo .env al contenedor
COPY .env ./

# Copia el código fuente al contenedor
COPY . ./

# Construye el binario de la aplicación
RUN go build -o main .

# Usa una imagen base más ligera para ejecutar la aplicación
FROM alpine:latest

# Instala las dependencias necesarias para ejecutar Go
RUN apk --no-cache add ca-certificates

# Copia el binario desde el contenedor de construcción
COPY --from=builder /app/main /app/main

# Copia el archivo .env desde el contenedor de construcción
COPY --from=builder /app/.env /app/.env

# Exponer el puerto donde estará disponible el servidor
EXPOSE 3012

# Comando para ejecutar la aplicación
CMD ["/app/main"]
