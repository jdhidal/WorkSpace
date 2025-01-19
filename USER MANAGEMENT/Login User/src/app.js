// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const userController = require('./UserController');

dotenv.config();

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser()); // Para manejar cookies

// Cargar Swagger
const swaggerDocument = YAML.load('./src/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.post('/login', userController.login);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Authentication service running on http://localhost:${port}`);
});
