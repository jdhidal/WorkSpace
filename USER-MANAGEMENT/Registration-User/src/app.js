// app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const cors = require('cors');
const { createUser } = require('./userController');

require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/create', createUser);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Service running on http://localhost:${port}`);
});
