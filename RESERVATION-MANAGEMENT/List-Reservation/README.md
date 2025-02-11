
```markdown
# Reservation Service - GraphQL API

This project is a service for managing reservations using GraphQL. It is built with Go and GORM to interact with a MySQL database.

## Features

- GraphQL API to list reservations.
- Uses GORM for interacting with the MySQL database.
- Containerized with Docker for easy deployment.

## Requirements

- Docker (to run the service in a container)
- Go 1.20 or higher (if you want to run the application directly without Docker)
- A MySQL database configured for the service

## Project Structure

```
reservation-management/
├── Dockerfile             # Dockerfile to containerize the application
├── go.mod                 # Go module file
├── go.sum                 # Go dependencies checksum file
├── main.go                # Main entry point for the Go application
├── resolvers/             # GraphQL resolvers
│   └── resolvers.go       # Logic for resolving GraphQL queries
├── models/                # Data models for the application
│   └── reservation.go     # Reservation model
└── db/                    # Database connection setup
    └── db.go              # Database connection logic
```

## Setup

### 1. Clone the repository

Clone the project to your local machine:

```bash
git clone https://github.com/yourusername/reservation-service.git
cd reservation-service
```

### 2. Install dependencies (optional if not using Docker)

If you're running the application directly without Docker, you can install dependencies by running:

```bash
go mod tidy
```

### 3. Configuration

Ensure that you have a MySQL database running, and set up the necessary environment variables for your connection string. 

You can configure the following in a `.env` file or set them manually:

- `DB_USER`: MySQL username
- `DB_PASSWORD`: MySQL password
- `DB_HOST`: MySQL host (e.g., `localhost` or a container name if using Docker)
- `DB_PORT`: MySQL port (default is `3306`)
- `DB_NAME`: MySQL database name (e.g., `reservation_db`)

### 4. Running with Docker

If you are using Docker, follow these steps:

#### Build the Docker image

Run the following command in the project directory to build the Docker image:

```bash
docker build -t reservation-service .
```

#### Run the Docker container

Once the image is built, you can run the container using:

```bash
docker run -p 3012:3012 reservation-service
```

This will start the application, and it will be accessible at `http://localhost:3012/graphql`.

### 5. Running without Docker (optional)

If you prefer to run the application locally without Docker, use the following command:

```bash
go run main.go
```

Ensure your database is up and running before starting the application.

## GraphQL API

Once the service is running, you can interact with the GraphQL API at `http://localhost:3012/graphql`.

### Example Query

To get a list of reservations, use the following query:

```graphql
{
  listReservations {
    id
    facility_name
    user_name
    reservation_date
    status
  }
}
```

## Docker Compose (Optional)

If you'd like to run both the application and the MySQL database using Docker Compose, you can create a `docker-compose.yml` file with the necessary configuration. Here's an example:

```yaml
version: '3.8'

services:
  reservation-service:
    build: .
    ports:
      - "3012:3012"
    depends_on:
      - mysql
    environment:
      - DB_USER=root
      - DB_PASSWORD=example
      - DB_HOST=mysql
      - DB_PORT=3306
      - DB_NAME=reservation_db
  mysql:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: reservation_db
    ports:
      - "3306:3306"
```

To run the services with Docker Compose:

```bash
docker-compose up --build
```

This will run both the application and MySQL in containers.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Key Sections:
- **Introduction**: Provides a brief overview of the project.
- **Setup**: Instructions for cloning the repository, installing dependencies, configuring the database connection, and running the app either with or without Docker.
- **Docker**: Specific instructions for containerizing the application using Docker.
- **GraphQL API**: A sample query for interacting with the GraphQL API.
- **Docker Compose (Optional)**: If you want to run the app and MySQL together with Docker Compose.
