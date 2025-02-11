Here’s the `README.md` in English:

```markdown
# List Role - Microservice REST API

This is a Node.js microservice that provides a REST API to list roles from a MySQL database. The service uses Express to handle requests and CORS to allow cross-origin requests. It connects to a MySQL database and exposes an endpoint to query the registered roles.

## Technologies Used

- **Node.js**: JavaScript runtime environment for server-side applications.
- **Express**: Web framework for building APIs in Node.js.
- **MySQL**: Relational database to store roles.
- **CORS**: Allows cross-origin requests (Cross-Origin Resource Sharing).
- **dotenv**: Loads environment variables from a `.env` file.
- **mysql2**: MySQL client for Node.js.
- **Docker**: Container platform to run the application in an isolated environment.

## Requirements

- Node.js >= 16.x
- MySQL (with a configured database)
- Docker (optional, for containerization)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-user/list-role.git
cd list-role
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the `.env` file

Make sure to have a `.env` file in the root directory of your project. Example:

   DB_HOST=your-database-hostname
   DB_USERNAME=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=roles_management

Adjust the environment variables according to your database configuration.

### 4. Run the server

```bash
npm start
```

The server will be available at `http://localhost:3020`.

### 5. Run with Docker (optional)

If you prefer to run the application using Docker, follow these steps:

1. Build the image:

   ```bash
   docker build -t list-role .
   ```

2. Run the container:

   ```bash
   docker run -d -p 3020:3020 --env-file .env list-role
   ```

The service will be available at `http://localhost:3020`.

## Endpoints

### `GET /list-role`

This endpoint returns a list of all roles stored in the database.

**Response**:
```json
{
  "roles": [
    {
      "id": 1,
      "name": "Administrator"
    },
    {
      "id": 2,
      "name": "User"
    }
  ]
}
```
