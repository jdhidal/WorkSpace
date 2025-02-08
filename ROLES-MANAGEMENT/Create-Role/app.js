const express = require('express');
const cors = require('cors');  // Se importa CORS
const dotenv = require('dotenv');
const db = require('./db');

// Cargar las variables de entorno
dotenv.config();

const app = express();

// Habilitar CORS globalmente en todas las rutas
app.use(cors());  // Se aplica CORS para permitir solicitudes de otros orígenes

// Middleware
app.use(express.json());  // Para manejar JSON en las solicitudes

// Ruta para crear el rol
app.post('/create-role', (req, res) => {
  const { role } = req.body; // Recibe el rol desde el cuerpo de la solicitud

  // Validar que el rol sea válido
  if (!role || !['estudiante', 'profesor', 'administrador'].includes(role)) {
    return res.status(400).send('Role no válido');
  }

  // SQL para insertar el rol en la base de datos
  const query = 'INSERT INTO roles (nombre) VALUES (?)';  // Usamos "nombre" en lugar de "role_name"

  db.query(query, [role], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al crear el rol');
    }
    res.status(201).send('Rol creado exitosamente');
  });
});

// Iniciar el servidor en el puerto 3017
app.listen(3017, () => {
  console.log('Microservicio corriendo en el puerto 3017');
});
