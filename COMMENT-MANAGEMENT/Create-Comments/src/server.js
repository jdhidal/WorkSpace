const express = require('express');
const connectDB = require('./database');
const comentarioRoutes = require('./routes/CommentsRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3015;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use(require('cors')());  // CORS habilitado

// Cambiar la ruta de los comentarios
app.use('/create-comments', comentarioRoutes);  // Nueva ruta

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
