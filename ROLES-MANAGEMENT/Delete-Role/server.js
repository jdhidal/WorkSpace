const express = require('express');
const cors = require('cors');
const roleRoutes = require('./routes/roleRoutes');

require('dotenv').config();  // Asegúrate de cargar las variables de entorno

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para eliminar roles
app.use('/delete-role', roleRoutes);

// Iniciar el servidor
app.listen(process.env.PORT, () => {
  console.log(`Microservicio corriendo en el puerto ${process.env.PORT}`);
});
