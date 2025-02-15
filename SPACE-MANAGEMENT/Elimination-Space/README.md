# 🏢 Coworking Elimanate Spaces API - Ruby & Sinatra

This API, built with Ruby and Sinatra, provides endpoints to manage coworking spaces. It supports CORS for cross-origin requests and is deployed on an AWS instance. The API handles user requests for listing, creating, updating, and deleting coworking spaces while ensuring secure access with proper headers and credentials.

## 🚀 Features

- Built with Sinatra and ActiveRecord
- CORS configuration for secure frontend interaction
- RESTful routes for coworking space management
- Environment variables managed with Dotenv
- Runs on AWS

## 📦 Running with Docker

The service is available as a Docker image on **Docker Hub**.

### 🏗️ Pull and Run

1. Pull the image:
```sh
   docker pull jdhidalgo673/elimination-space:latest
```

2. Run the container:
```sh
   docker run -d -p 3006:3006 --name elimination-space-container jdhidalgo673/elimination-space:latest
```

### 📜 Dependencies

```sh
    gem install bundler -v 2.3.3
    bundle update
    bundle install
```

###  ✅ Validate API
```bash
    curl -X DELETE http://localhost:3006/coworking_spaces/12
```

###  🔒 Security

- CORS is configured to allow secure cross-origin requests.
