## 🏢 Availability Management - List Availability

This is a microservice built with Go for managing space availability in a coworking environment. It connects to a PostgreSQL database and runs on AWS.

## 🚀 Features

- Connects to a PostgreSQL database.
- REST API for managing availability.
- Runs in a Docker container.
- Configured with environment variables.

## 📦 Running with Docker

The service is available as a Docker image on **Docker Hub**.

### 🏗️ Pull and Run

1. Pull the image:
```sh
   docker pull jdhidalgo673/list-availability:latest
```

2. Run the container:
```sh
   docker run -d -p 3008:3008 --name list-availability-container jdhidalgo673/list-availability:latest
```

### 📜 Dependencies

```sh
    go mod init availability-management/list-availability
    go get github.com/gin-gonic/gin
    go get github.com/lib/pq
    go get github.com/joho/godotenv
    go get -u github.com/swaggo/swag/cmd/swag
    go get -u github.com/gin-gonic/gin
    go get -u github.com/swaggo/gin-swagger
    go get -u github.com/swaggo/gin-swagger/swaggerFiles
    go get -u github.com/gin-contrib/cors
```

###  ✅ Validate API
```bash
    curl -X GET "http://localhost:3008/availability/1"
```

###  🔒 Security

- CORS is configured to allow secure cross-origin requests.