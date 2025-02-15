## 🏢 Availability Management - Create Availability

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
   docker pull jdhidalgo673/create-availability:latest
```

2. Run the container:
```sh
   docker run -d -p 3007:3007 --name create-availability-container jdhidalgo673/create-availability:latest
```

### 📜 Dependencies

```sh
    go mod init availability-management/create-availability
    go get -u github.com/gin-gonic/gin
    go get -u github.com/joho/godotenv
    go get -u github.com/lib/pq
    go get -u github.com/swaggo/swag/cmd/swag
    go install github.com/swaggo/swag/cmd/swag@latest
    go get -u github.com/gin-contrib/cors
```

###  ✅ Validate API
```bash
    $uri = "http://localhost:3007/availability"

# Datos JSON que enviarás
$jsonData = '{
    "coworking_space_id": 3,
    "start_date": "2025-02-10",
    "end_date": "2025-02-15",
    "start_time": "08:00:00",
    "end_time": "18:00:00",
    "status": "available",
    "max_capacity": 20,
    "notes": "Sala de reuniones"
}'

# Cabecera para indicar que los datos están en formato JSON
$headers = @{
    "Content-Type" = "application/json"
}

# Hacer la solicitud POST
$response = Invoke-RestMethod -Uri $uri -Method Post -Headers $headers -Body $jsonData

# Mostrar la respuesta
$response
```

###  🔒 Security

- CORS is configured to allow secure cross-origin requests.