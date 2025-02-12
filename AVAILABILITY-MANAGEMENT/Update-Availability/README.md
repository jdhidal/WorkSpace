# 📅 Availability API - Flask & PostgreSQL

This API manages coworking space availability. It uses Flask, PostgreSQL, and a stored procedure to update space capacity.

## 🚀 Features

- **Update availability** via `POST /update-availability`
- **CORS** enabled for requests from `http://44.218.54.250:3000`
- **Docker** for easy deployment
- **Database connection** via environment variables
- **Swagger** documentation for API endpoints

## 📦 Running with Docker

The service is available as a Docker image.

### 🏗️ Pull and Run

1. Pull the image:
```sh
    docker pull jdhidalgo673/update-availability:latest
```

2. Run the container:
```sh
   docker run -d -p 3011:3011 --env-file update-availability-container jdhidalgo673/update-availability:latest
```

### 📜 Dependencies

```sh
   pip install -r requirements.txt
```

###  ✅ Validate API
```bash
    curl -X POST "http://localhost:3011/reduce-capacity/20"
```

###  🔒 Security

- Data encryption is implemented for sensitive information.
- CORS is configured to allow secure cross-origin requests.
- Cookies are used for session management.