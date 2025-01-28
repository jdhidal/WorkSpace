# Usa una imagen base de Go
FROM golang:1.20-alpine AS builder

# Configura el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el go.mod y go.sum y descarga las dependencias
COPY go.mod go.sum ./
RUN go mod download

# Copia el código fuente al contenedor
COPY . .

# Construye el binario de la aplicación
RUN go build -o main .

# Usa una imagen base más ligera para ejecutar la aplicación
FROM alpine:latest

# Instala las dependencias necesarias para ejecutar Go
RUN apk --no-cache add ca-certificates

# Copia el binario desde el contenedor de construcción
COPY --from=builder /app/main /app/main

# Exponer el puerto donde estará disponible el servidor
EXPOSE 3012

# Comando para ejecutar la aplicación
CMD ["/app/main"]
