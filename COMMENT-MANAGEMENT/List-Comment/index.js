// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connection");
const commentRoutes = require("./src/routes/commentRoutes");  // Importa las rutas

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/list-comments", commentRoutes);  // Aquí definimos que /list-comments usará commentRoutes

const PORT = process.env.PORT || 3016;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
