const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3020;

// Habilitar CORS
app.use(cors());

// Crear conexión con la base de datos MySQL utilizando las variables del archivo .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,  // Usar el nombre de usuario desde el .env
  password: process.env.DB_PASSWORD,  // Usar la contraseña desde el .env
  database: process.env.DB_NAME  // Usar el nombre de la base de datos desde el .env
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    process.exit(1);
  }
  console.log('Conexión a la base de datos establecida');
});

// Ruta REST para listar los roles
app.get('/list-role', (req, res) => {
  // Consulta SQL para obtener los roles
  const query = 'SELECT * FROM roles';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los roles:', err);
      return res.status(500).json({ error: 'Error al obtener los roles' });
    }
    
    // Enviar la respuesta en formato JSON
    res.status(200).json({ roles: results });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
