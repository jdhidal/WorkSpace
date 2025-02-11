const express = require('express');
const connectDB = require('./database');
const comentarioRoutes = require('./routes/CommentsRoutes'); // Mantienes el mismo archivo de rutas
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3016;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use(require('cors')());  // CORS habilitado

// Cambiar la ruta a /delete-comments
app.use('/delete-comments', comentarioRoutes);  // Aquí cambiamos la ruta

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
