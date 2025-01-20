# Usa la imagen oficial de Go
FROM golang:1.19 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos al contenedor
COPY . .

# Descarga las dependencias
RUN go mod tidy

# Compila el código
RUN go build -o main .

# Usa una imagen más ligera para la ejecución
FROM gcr.io/distroless/base

# Copia el binario compilado
COPY --from=build /app/main /main

# Expone el puerto
EXPOSE 3010

# Comando por defecto
CMD ["/main"]
