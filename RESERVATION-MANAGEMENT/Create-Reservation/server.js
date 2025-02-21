const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const { buildSchema } = require('graphql');

dotenv.config();

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

const schema = require('./schema');
const resolvers = require('./resolvers');

app.use('/create-reservation', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}));

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
