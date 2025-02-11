const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.post('/create-role', (req, res) => {
  const { role } = req.body;

  const query = 'INSERT INTO roles (nombre) VALUES (?)';

  db.query(query, [role], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al crear el rol');
    }
    res.status(201).send('New Role Succesful');
  });
});

app.listen(3017, () => {
  console.log('Microservice run in port 3017');
});
