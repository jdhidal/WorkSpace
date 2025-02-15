# Delete Role Microservice

This microservice allows deleting roles (student, teacher, administrator) using **Node.js** and **SOAP**. It follows the **YAGNI** design principle and runs on **port 3018**, connecting to a **MySQL** database.

## Features
- Deletes roles via **SOAP API**.
- Uses **MySQL** for data storage.
- Supports **CORS**.
- Uses an `.env` file for environment variables.

## Technologies Used
- Node.js
- Express.js
- MySQL
- SOAP
- CORS
- dotenv
- Docker

## Project Structure
```
/project-root
│── db/                # Database connection
│── models/            # Data models
│── resolvers/         # Business logic
│── server.js          # Main entry point
│── .env               # Environment variables
│── Dockerfile         # Docker configuration
│── package.json       # Dependencies and scripts
│── README.md          # Project documentation
```

## Installation & Setup
### 1. Clone the repository
```sh
git clone https://github.com/your-repo/delete-role-service.git
cd delete-role-service
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory and add:
```env
   DB_HOST=your-database-hostname
   DB_USERNAME=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=roles_management
```

### 4. Start the server
```sh
npm start
```
The service should be running at `http://localhost:3018`.

## API Usage
### DELETE `/delete-role/{roleId}`
#### Request Example:
```sh
DELETE http://localhost:3018/delete-role/1
```
#### Response Example:
```json
{
  "message": "Role successfully deleted"
}
```

## Running with Docker
### 1. Build the Docker image
```sh
docker build -t delete-role-service .
```

### 2. Run the container
```sh
docker run -p 3018:3018 --env-file .env delete-role-service
```


