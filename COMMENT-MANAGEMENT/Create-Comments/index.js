const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/connection");
const commentRoutes = require("./src/routes/commentRoutes");

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());
app.use("/", commentRoutes);

const PORT = process.env.PORT || 3015;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Server run in http://localhost:${PORT}`);
});
