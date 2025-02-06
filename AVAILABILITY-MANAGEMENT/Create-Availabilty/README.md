go mod init availability-management/create-availability
go get -u github.com/gin-gonic/gin
go get -u github.com/joho/godotenv
go get -u github.com/lib/pq
go get -u github.com/swaggo/swag/cmd/swag
go install github.com/swaggo/swag/cmd/swag@latest



# URL del endpoint
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
