const mysql = require('mysql2');

// Crear la conexión con MySQL usando las variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Función para conectar a la base de datos
const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err.stack);
      return;
    }
    console.log('Conectado a la base de datos MySQL');
  });
};

module.exports = { connectDB, db };
