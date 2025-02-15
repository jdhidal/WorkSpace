# Create-Reservation Microservice

This microservice allows users to create reservations using GraphQL. It follows the SOLID principles, connects to a MySQL database, and uses CORS for cross-origin requests.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Schema](#database-schema)
- [Running the Microservice](#running-the-microservice)
- [GraphQL Endpoint](#graphql-endpoint)
- [Docker Setup](#docker-setup)

## Technologies Used
- Node.js
- Express
- GraphQL
- MySQL
- CORS
- dotenv

## Project Structure
```
/create-reservation
|-- /node_modules
|-- .env
|-- server.js
|-- schema.js
|-- resolvers.js
|-- package.json
|-- Dockerfile
|-- README.md
```

## Installation
Clone the repository and install dependencies:

```sh
git clone https://github.com/your-repo/create-reservation.git
cd create-reservation
npm install
```

## Configuration
Create a `.env` file with the following content:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=reservation_db
PORT=3010
```

## Database Schema
Run the following SQL script to create the required table:

```sql
CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  facility_name VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  reservation_date DATE NOT NULL,
  status ENUM('active', 'inactive') NOT NULL
);
```

## Running the Microservice
To start the microservice, run:

```sh
node server.js
```

The service will be available at `http://localhost:3010/create-reservation`.

## GraphQL Endpoint
You can use GraphiQL to test the API:

- URL: `http://localhost:3010/create-reservation`

Example mutation:

```graphql
mutation {
  createReservation(input: {
    facility_name: "Conference Room A",
    user_name: "John Doe",
    reservation_date: "2025-02-15",
    status: "active"
  }) {
    id
    facility_name
    user_name
    reservation_date
    status
  }
}
```

## Docker Setup
To build and run the microservice in a Docker container:

```sh
docker build -t create-reservation .
docker run -p 3010:3010 --env-file .env create-reservation
```

Now your service should be running inside a Docker container.

## License
This project is licensed under the MIT License.

