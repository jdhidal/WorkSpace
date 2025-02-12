# 🔐 User Registration & Authentication - Node.js Service

This section describes how to register users and manage authentication using Node.js and Express. The service secures user credentials with bcryptjs for password hashing and JWT (JSON Web Token) for authentication. It also includes API documentation with Swagger and supports CORS for cross-origin requests.

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
   docker pull jdhidalgo673/registration-user:latest
```

2. Run the container:
```sh
   docker run -d -p 3001:3001 --name registration-user-container jdhidalgo673/registration-user:latest
```

### 📜 Dependencies

```sh
   npm install express swagger-ui-express yamljs cors dotenv bcryptjs mysql2
```

### API Documentation

```sh
   http://localhost:3001/api-docs
```

###  ✅ Validate API
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

###  🔒 Security

- Data encryption is implemented for sensitive information.
- CORS is configured to allow secure cross-origin requests.
- Cookies are used for session management.