
```markdown
# Comment Management - List Comments Microservice

This is a Node.js microservice for listing comments stored in a MongoDB database. The service is exposed through a REST API at the `/list-comments` endpoint.

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (should be running or accessible via a URL)
- [Docker](https://www.docker.com/) (if you want to run the service in a container)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd COMMENT-MANAGEMENT/List-Comment
   ```

2. **Install dependencies:**

   In the root directory of the project, run the following command:

   ```bash
   npm install
   ```

## Configuration

Make sure to create a `.env` file in the root of your project with the following configuration:

```env
MONGO_URI=mongodb://localhost:27017/your_database_name
PORT=3016
```

- **MONGO_URI:** The connection URL to your MongoDB database.
- **PORT:** The port on which the microservice will run (default is 3016).

## Usage

### Run the microservice

To start the server, run:

```bash
npm start
```

The server will listen on the port specified in the `.env` file (default: 3016).

### API Endpoint

The service exposes the following endpoint to list comments:

- **GET** `/list-comments`: Returns a list of all comments stored in the database.

### Example Request (using Postman or curl)

To retrieve all comments, make a `GET` request to the following URL:

```
http://localhost:3016/list-comments
```

## Docker Support

You can also run this service in a Docker container.

### Build the Docker image

In the root directory of the project, run the following command to build the Docker image:

```bash
docker build -t comment-management-list-comments .
```

### Run the Docker container

Once the image is built, run the container with:

```bash
docker run -p 3016:3016 --env-file .env comment-management-list-comments
```

This will start the service inside the Docker container, and it will be accessible at `http://localhost:3016/list-comments`.
