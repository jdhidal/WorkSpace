const mysql = require('mysql2');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conexión con la base de datos
connection.connect((err) => {
    if (err) throw err;
    console.log("Conectado a la base de datos MySQL en AWS RDS.");
});

module.exports = connection;
