const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3020;


app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,  
  password: process.env.DB_PASSWORD,  
  database: process.env.DB_NAME  
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    process.exit(1);
  }
  console.log('Conexión a la base de datos establecida');
});

app.get('/list-role', (req, res) => {
  const query = 'SELECT * FROM roles';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los roles:', err);
      return res.status(500).json({ error: 'Error al obtener los roles' });
    }
    
    res.status(200).json({ roles: results });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
