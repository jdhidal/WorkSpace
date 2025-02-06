# Usamos una imagen base de Go
FROM golang:1.20-alpine

# Seteamos el directorio de trabajo
WORKDIR /app

# Copiamos el go.mod y go.sum
COPY go.mod go.sum ./

# Instalamos las dependencias
RUN go mod tidy

# Copiamos todo el código fuente
COPY . .

# Exponemos el puerto en el que el servidor escuchará
EXPOSE 3009

# Comando para ejecutar la aplicación
CMD ["go", "run", "main.go"]
