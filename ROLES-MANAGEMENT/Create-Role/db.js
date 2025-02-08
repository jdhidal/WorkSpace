const mysql = require('mysql2');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,  // Usar la variable DB_HOST del archivo .env
  user: process.env.DB_USERNAME,  // Usar la variable DB_USERNAME del archivo .env
  password: process.env.DB_PASSWORD,  // Usar la variable DB_PASSWORD del archivo .env
  database: process.env.DB_NAME   // Usar la variable DB_NAME del archivo .env
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to the database with ID ' + connection.threadId);
});

// Exportar la conexión para usarla en otros archivos
module.exports = connection;
