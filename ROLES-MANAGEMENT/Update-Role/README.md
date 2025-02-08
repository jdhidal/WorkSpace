
# SOAP Role Management Microservice

This project is a SOAP-based microservice developed with Node.js, which allows you to manage roles (such as `student`, `teacher`, and `admin`). The microservice interacts with a MySQL database and is designed following the YAGNI principle.

## Features

- **SOAP** protocol for communication.
- **CORS** support for cross-origin requests.
- **MySQL** database for storing roles.
- Exposes a **SOAP endpoint** at `/update-role` to update roles.

## Requirements

Before running the microservice, make sure you have the following installed:

- **Node.js** (version 16 or above)
- **Docker** (for containerization, optional)
- **MySQL** (for the database)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/soap-role-management.git
cd soap-role-management
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add your database connection details:

```env
DB_HOST=create-role.c4u33yi9malf.us-east-1.rds.amazonaws.com
DB_USERNAME=admin
DB_PASSWORD=UCentral2899
DB_NAME=roles_management
PORT=3019
```

Ensure that the MySQL database exists and has the `roles_management` schema. You can create the database and table with the following SQL:

```sql
CREATE DATABASE IF NOT EXISTS roles_management;
USE roles_management;

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL
);
```

### 4. Run the Microservice

To start the microservice, run the following command:

```bash
npm start
```

The service will listen on port `3019`.

## Docker (Optional)

If you'd like to run the microservice inside a Docker container, follow these steps:

### 1. Build the Docker Image

```bash
docker build -t soap-service .
```

### 2. Run the Docker Container

```bash
docker run -p 3019:3019 --env-file .env soap-service
```

This will expose the service on port `3019`.

## SOAP API

The service exposes a **SOAP** endpoint at `/update-role` to update roles in the database.

### WSDL (Web Services Description Language)

The service follows the SOAP standard, and the WSDL is automatically available at:

```
http://localhost:3019/update-role?wsdl
```

### Example SOAP Request

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:web="http://localhost:3019/update-role">
   <soapenv:Header/>
   <soapenv:Body>
      <web:updateRole>
         <role>administrator</role>
         <id>4</id>
      </web:updateRole>
   </soapenv:Body>
</soapenv:Envelope>
```

### Example SOAP Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="http://localhost:3019/update-role">
   <soap:Body>
      <tns:updateRoleResponse>
         <tns:status>Role updated successfully</tns:status>
      </tns:updateRoleResponse>
   </soap:Body>
</soap:Envelope>
```
