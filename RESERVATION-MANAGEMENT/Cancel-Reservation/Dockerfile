# Usa una imagen base de Go
FROM golang:1.20-alpine as builder

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia go.mod y go.sum para aprovechar el caché de Docker y evitar la descarga de dependencias cada vez
COPY go.mod go.sum ./

# Descarga las dependencias de Go
RUN go mod tidy

# Copia el código fuente de la aplicación en el contenedor
COPY . .

# Construye la aplicación
RUN go build -o main .

# Usa una imagen base de Alpine para la parte final (sin el entorno de desarrollo de Go)
FROM alpine:latest

# Instala las dependencias necesarias (por ejemplo, para el uso de MySQL si es necesario)
RUN apk --no-cache add ca-certificates

# Copia el archivo binario desde el contenedor de la fase de construcción
COPY --from=builder /app/main /usr/local/bin/

# Expón el puerto donde se ejecutará el servidor
EXPOSE 3011

# Comando para ejecutar la aplicación
CMD ["main"]
