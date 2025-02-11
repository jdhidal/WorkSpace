# Create Comments Microservice

This is a Node.js microservice that allows users to create and manage comments using MongoDB as the database. The application follows RESTful API principles, uses SOLID design principles, and includes CORS support.

## Features
- **RESTful API** for creating comments.
- **MongoDB Atlas** integration for data storage.
- **CORS** support for cross-origin requests.
- **Docker** support to containerize the application.

## Requirements

- Node.js (version 14 or higher)
- MongoDB Atlas account (for database connection)
- Docker (optional, for containerization)

## Setup and Installation

Follow these steps to set up and run the project:

### 1. Clone the Repository

```bash
git clone https://github.com/your-repository/create-comments.git
cd create-comments
```

### 2. Install Dependencies

First, ensure you have the required Node.js version installed. Then, install the project dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```
PORT=3015
MONGO_URI=mongodb+srv://admin:your_password@create-comments.azx6l.mongodb.net/?retryWrites=true&w=majority&appName=create-comments
```

Replace `your_password` with your MongoDB Atlas password.

### 4. Start the Application

You can run the application using:

```bash
npm start
```

This will start the server on `http://localhost:3015`. You should see the following output in the terminal:

```
✅ Connected to MongoDB
🚀 Server running at http://localhost:3015
```

### 5. Test with Postman

Use Postman or another API testing tool to interact with the API.

**Example POST request**:

- **URL**: `http://localhost:3015/api/create-comments`
- **Method**: POST
- **Body (JSON)**:
  ```json
  {
    "name": "John Doe",
    "comment": "This is a great platform!"
  }
  ```

### Docker Setup (Optional)

If you'd like to run the application inside a Docker container, follow these steps:

1. **Build the Docker image**:

   ```bash
   docker build -t create-comments .
   ```

2. **Run the Docker container**:

   ```bash
   docker run -p 3015:3015 --env-file .env create-comments
   ```

This will run the application on port 3015 inside the container.

### 6. Access the Application

After starting the server, you can access the API at `http://localhost:3015`.

## API Endpoints

### POST `/api/create-comments`

- **Description**: Creates a new comment.
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "comment": "User Comment"
  }
  ```
- **Response**:
  ```json
  {
    "name": "User Name",
    "comment": "User Comment",
    "_id": "unique-id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```

## Dockerfile

The project includes a `Dockerfile` to containerize the application. To build and run the Docker container, use the following commands:

1. **Build the Docker image**:

   ```bash
   docker build -t create-comments .
   ```

2. **Run the Docker container**:

   ```bash
   docker run -p 3015:3015 --env-file .env create-comments
   ```

## License

This project is licensed under the MIT License.

