# Cancel Reservation Microservice

This microservice allows users to cancel a reservation and automatically delete it after a specified period. It is built using Go with GraphQL for API communication and uses MySQL as the database.

## Features
- Cancel a reservation by changing its status to "canceled."
- Automatically delete the reservation after a predefined time.
- GraphQL API for managing reservations.
- Docker support for easy deployment.

## Requirements
- Go 1.20 or later
- MySQL database
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/cancel-reservation.git
   cd cancel-reservation
   ```

2. Set up the environment variables in a `.env` file:
   ```env
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_HOST=mysql-server
   DB_PORT=3306
   DB_NAME=reservation_db
   ```

3. Install dependencies:
   ```sh
   go mod tidy
   ```

4. Run the application:
   ```sh
   go run main.go
   ```

## Running with Docker

1. Build the Docker image:
   ```sh
   docker build -t cancel-reservation-app .
   ```

2. Run the container:
   ```sh
   docker run -p 3011:3011 --env-file .env cancel-reservation-app
   ```

## Testing the API with Postman

### Cancel a Reservation
To cancel a reservation, send a `POST` request to:
   ```
   http://localhost:3011/cancel-reservation
   ```

Use the following GraphQL mutation in the request body:

```json
{
  "query": "\n    mutation CancelReservation($id: Int!) {\n      cancelReservation(id: $id) {\n        id\n        facility_name\n        user_name\n        reservation_date\n        status\n      }\n    }\n  ",
  "variables": {
    "id": 1
  }
}
```

### Expected Response:
```json
{
  "data": {
    "cancelReservation": {
      "id": 1,
      "facility_name": "Gym A",
      "user_name": "John Doe",
      "reservation_date": "2025-01-28T10:00:00Z",
      "status": "canceled"
    }
  }
}
```

## License
This project is licensed under the MIT License.

