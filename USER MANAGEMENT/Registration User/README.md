DEPENDENCES 

npm install express swagger-ui-express yamljs cors dotenv bcryptjs mysql2


Powershell validate

```bash
$headers = @{
    "Content-Type" = "application/json"
}

$body = '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}'

Invoke-RestMethod -Uri http://localhost:3003/create -Method Post -Headers $headers -Body $body
```

