Here's a simple `README.md` file in English for your project:

```markdown
# Create Role Microservice

This is a simple Node.js microservice that allows you to create roles (e.g., "student", "teacher", "administrator") in a MySQL database. The microservice is built with the principles of **YAGNI (You Aren't Gonna Need It)** and is structured to be as minimal as possible, providing only the essential functionality of creating roles.

It is designed to run in a Docker container and can be deployed to any environment with Docker support.

## Features

- **SOAP-based** service for role creation.
- **MySQL database** for storing the roles.
- Uses **CORS** for cross-origin requests.
- **Dockerized** for easy deployment and portability.
- **Environment variables** are used for configuration, stored in a `.env` file.
- Runs on **port 3017** by default.

## Prerequisites

Before running this project, you need to have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [Docker](https://www.docker.com/get-started)
- [MySQL](https://www.mysql.com/) (running on Amazon RDS or locally)

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/create-role-microservice.git
   cd create-role-microservice
   ```

2. **Install dependencies**:
   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

3. **Configure the `.env` file**:
   Create a `.env` file in the root of your project and add the following configuration:

   ```env
   DB_HOST=your-database-hostname
   DB_USERNAME=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=roles_management
   PORT=3017
   ```

   Replace the placeholder values with your actual database credentials.

4. **Create the MySQL database and table**:

   If you are using MySQL (either locally or on AWS RDS), run the following SQL commands to create the database and table:

   ```sql
   CREATE DATABASE IF NOT EXISTS roles_management;
   USE roles_management;

   CREATE TABLE IF NOT EXISTS roles (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nombre VARCHAR(255) NOT NULL
   );
   ```

## Running with Docker

To run the application in a Docker container, follow these steps:

1. **Build the Docker image**:
   From the root directory of your project, build the Docker image by running:
   ```bash
   docker build -t create-role-microservice .
   ```

2. **Run the Docker container**:
   Run the following command to start the container:
   ```bash
   docker run -p 3017:3017 --env-file .env create-role-microservice
   ```

   - This will map the container's port `3017` to your local machine's port `3017`.
   - The application will run using the environment variables specified in the `.env` file.

## API Endpoints

### `POST /create-role`

This endpoint allows you to create roles in the database.

- **URL**: `/create-role`
- **Method**: `POST`
- **Request Body**: 
  ```json
  {
    "role": "role_name"
  }
  ```
  Example:
  ```json
  {
    "role": "student"
  }
  ```

- **Response**:
  - Success:
    ```json
    {
      "message": "Role created successfully"
    }
    ```
  - Error:
    ```json
    {
      "message": "Error creating role"
    }
    ```

## Testing the API

You can test the API using tools like **Postman** or **cURL**.

### Using Postman:
- Method: `POST`
- URL: `http://localhost:3017/create-role`
- Body (JSON):
  ```json
  {
    "role": "professor"
  }
  ```

### Using cURL:
Run the following command in the terminal:
```bash
curl -X POST http://localhost:3017/create-role -H "Content-Type: application/json" -d '{"role": "admin"}'
```

## Notes

- Ensure that your Amazon RDS instance is accessible from your machine (adjust security group rules in AWS).
- If running locally, make sure MySQL is installed and running on your machine.
- This microservice only implements role creation. Other CRUD operations (update, delete, list) are not implemented, following the **YAGNI** principle.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Explanation of Sections:
- **Project Overview**: A brief description of the microservice and its features.
- **Prerequisites**: Instructions for ensuring that the necessary software (Node.js, Docker, MySQL) is installed.
- **Setup Instructions**: Steps for cloning the repository, installing dependencies, configuring the `.env` file, and creating the MySQL database.
- **Docker Setup**: Instructions for building and running the project inside a Docker container.
- **API Endpoints**: Provides details on the available `POST /create-role` endpoint.
- **Testing**: Shows how to test the API using **Postman** or **cURL**.
- **Notes**: Information about connecting to the database and the limited functionality of the microservice.
  
You can customize this `README.md` further if needed, depending on your project structure or requirements. Let me know if you need any changes!