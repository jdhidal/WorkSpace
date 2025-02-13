# WorkSpace

## Overview
WorkSpace is a web application designed to facilitate the reservation of coworking spaces. The platform allows users to book available spaces, manage reservations, and handle roles efficiently. It is built using a microservices architecture and deployed on AWS infrastructure.

## Architecture
WorkSpace follows a microservices architecture with the following services:

- **Availability Management**: Handles the availability of coworking spaces.
- **Comment Management**: Manages user comments related to reservations and spaces.
- **Reservation Management**: Allows users to create, list, and manage reservations.
- **Roles Management**: Manages user roles (Student, Teacher, Administrator).
- **Space Management**: Handles the registration and updates of coworking spaces.
- **User Management**: Manages user information and authentication.

### Infrastructure
- **Hosting**: AWS EC2 instances
- **Scaling**: Auto Scaling Group & Load Balancer
- **Database**: Hosted on AWS EC2

## Installation
To run the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone -b qa https://github.com/jdhidal/WorkSpace.git
   ```

2. Navigate to the project directory:
   ```sh
   cd WorkSpace
   ```

3. Install dependencies for each microservice:
   ```sh
   cd <microservice-directory>
   npm install  # or pip install -r requirements.txt for Python services
   ```

4. Set up environment variables:
   - Create a `.env` file in each microservice directory and configure the required variables.

5. Run the microservices:
   ```sh
   npm start  # for Node.js services
   python app.py  # for Python services
   ```

## API Documentation
Each microservice follows a specific API design:

### REST-based Services:
- `Comment Management`
- `Availability Management`

### SOAP-based Services:
- `Roles Management`

### GraphQL-based Services:
- `Reservation Management`

## Deployment
The project is deployed on AWS using EC2 instances with Auto Scaling and a Load Balancer. Databases are also hosted on EC2.

## Contribution
To contribute to WorkSpace:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

## License
This project is licensed under [MIT License](LICENSE).

