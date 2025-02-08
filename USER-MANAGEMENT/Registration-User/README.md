DEPENDENCES 

npm install express swagger-ui-express yamljs cors dotenv bcryptjs mysql2


Powershell validate

```bash
$headers = @{
    "Content-Type" = "application/json"
}

$body = '{
    "name": "Diego Hidalgo",
    "email": "diego.doe@example.com",
    "password": "password1234"
}'

Invoke-RestMethod -Uri http://localhost:3001/create -Method Post -Headers $headers -Body $body
```

