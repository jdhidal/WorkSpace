DEPENDENCES

npm install express jsonwebtoken mysql2 dotenv body-parser cookie-parser bcryptjs cors swagger-ui-express yamljs


VALIDATE API
```bash
$headers = @{
    "Content-Type" = "application/json"
}

$body = '{
    "email": "john.doe@example.com",
    "password": "password123"
}'

Invoke-RestMethod -Uri http://localhost:3002/login -Method Post -Headers $headers -Body $body
```