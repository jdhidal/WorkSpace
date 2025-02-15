# List Users - Python Flask Service

This section describes how to list user details using a Flask backend. The service allows you to retrieve user information by their email address via a GET request to the /users/<email> endpoint. The data is fetched from a MySQL database using a stored procedure. CORS is enabled for secure cross-origin

## 🚀 Features

- User authentication via `GET /login`
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
   docker pull jdhidalgo673/list-user:latest
```

2. Run the container:
```sh
   docker run -d -p 3014:3014 --name list-user-container jdhidalgo673/list-user:latest
```

### 📜 Dependencies

```sh
   pip install -r requirements.txt
```

###  ✅ Validate API
```bash
    curl -X GET "http://localhost:3014/users/kevin1@correo.com" -H "Content-Type: application/json"
```

###  🔒 Security

- Data encryption is implemented for sensitive information.
- CORS is configured to allow secure cross-origin requests.
- Cookies are used for session management.