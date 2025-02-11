const express = require('express');
const cors = require('cors');
const roleRoutes = require('./routes/roleRoutes');

require('dotenv').config();  
const app = express();
app.use(cors());
app.use(express.json());

app.use('/delete-role', roleRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Microservicio corriendo en el puerto ${process.env.PORT}`);
});
