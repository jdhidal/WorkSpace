const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos", error);
        process.exit(1);
    }
};

module.exports = connectDB;
