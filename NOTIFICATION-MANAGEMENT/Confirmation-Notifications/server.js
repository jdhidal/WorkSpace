// server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketConfig = require('./config/socket');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(cors({
  origin: 'http://44.218.54.250:3000',
  methods: '*',
  credentials: true,
}));

app.use(express.json());

const server = http.createServer(app);

socketConfig.initSocket(server);

app.use('/api/notifications', notificationRoutes);

server.listen(3013, () => {
  console.log('Servidor WebSocket y API funcionando en http://localhost:3013');
});
