# Usar una imagen base con Go 1.23
FROM golang:1.23-alpine

# El resto del Dockerfile permanece igual
WORKDIR /app
COPY . .
RUN go mod tidy
EXPOSE 3010
RUN go build -o main .
CMD ["./main"]
