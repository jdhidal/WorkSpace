FROM golang:1.23-alpine

WORKDIR /app
COPY . .
RUN go mod tidy
EXPOSE 3010
RUN go build -o main .
CMD ["./main"]
