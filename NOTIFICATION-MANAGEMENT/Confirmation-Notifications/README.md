# Proyecto Backend con WebSocket y API REST

Este proyecto implementa un servidor WebSocket utilizando **Socket.IO** y una API REST para gestionar notificaciones. El backend está hecho con **Node.js** y **Express**.

## Tecnologías Utilizadas
- Node.js
- Express
- Socket.IO
- CORS
- Docker

## Requisitos
- Node.js 16 o superior
- Docker (opcional)

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
