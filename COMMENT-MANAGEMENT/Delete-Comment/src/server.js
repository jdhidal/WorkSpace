require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const commentsRoutes = require('./routes/CommentsRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

app.use('/api/comentarios', commentsRoutes);

const PORT = process.env.PORT || 3018;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
