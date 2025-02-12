const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const { db } = require('./src/db/db');  // Ruta correcta para db.js
const { schema } = require('./src/graphql/schema');  // Ruta correcta para schema.js
const { root } = require('./src/graphql/resolvers');  // Ruta correcta para resolvers.js

// Cargar las variables de entorno
dotenv.config();


const app = express();
const port = process.env.PORT || 3012;  // Usa el puerto de .env si está disponible

app.use(cors());

app.use('/list-reservation', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
