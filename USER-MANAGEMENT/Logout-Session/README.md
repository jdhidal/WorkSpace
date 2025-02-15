# List Users - Python Flask Service

This section describes how to list user details using a Flask backend. The service allows you to retrieve user information by their email address via a GET request to the /users/<email> endpoint. The data is fetched from a MySQL database using a stored procedure. CORS is enabled for secure cross-origin

## 🚀 Features

- API documentation with **Swagger**
- Runs in a **Docker container**
- Deployed on **AWS**

## 📦 Running with Docker

The service is available as a Docker image on **Docker Hub**.

### 🏗️ Pull and Run

1. Pull the image:
```sh
   docker pull jdhidalgo673/logout-service:latest
```

2. Run the container:
```sh
   docker run -d -p 3003:3003 --name logout-service-container jdhidalgo673/logout-service:latest
```

### 📜 Dependencies

```sh
   pip install -r requirements.txt
```

###  ✅ Validate API
```bash
    curl -X POST http://localhost:3003/logout
```