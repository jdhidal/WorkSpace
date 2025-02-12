# Authentication Service

This is an authentication service built with **Node.js** and **Express**, featuring **CORS** support, **cookies**, and **Swagger** documentation. It also encrypts data and is deployed on **AWS**.

## 🚀 Features

- User authentication via `POST /login`
- **CORS** protection
- Cookie and JSON handling with `cookie-parser` and `body-parser`
- API documentation with **Swagger**
- Runs in a **Docker container**
- Deployed on **AWS**

## 📦 Running with Docker

The service is available as a Docker image on **Docker Hub**.

### 🏗️ Pull and Run

1. Pull the image:
```sh
   docker pull jdhidalgo673/login-user:latest
```

2. Run the container:
```sh
   docker run -d -p 3002:3002 --name login-user-container jdhidalgo673/login-user:latest
```

### 📜 Dependencies

```sh
   npm install express jsonwebtoken mysql2 dotenv body-parser cookie-parser bcryptjs cors swagger-ui-express yamljs
```

### API Documentation

```sh
   http://localhost:3002/api-docs
```

###  ✅ Validate API
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

###  🔒 Security

- Data encryption is implemented for sensitive information.
- CORS is configured to allow secure cross-origin requests.
- Cookies are used for session management.