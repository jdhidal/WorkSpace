const express = require('express');
const cors = require('cors');
const roleRoutes = require('./routes/roleRoutes');

require('dotenv').config();  
const app = express();
app.use(cors());
app.use(express.json());

app.use('/delete-role', roleRoutes);

app.listen(process.env.PORT || 3018, () => {
  console.log(`Microservice run in Test 1: ${process.env.PORT || 3018}`);
});
