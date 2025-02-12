// config/socket.js
const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
    
    socket.emit('notification', { message: '¡Conectado a WebSocket!' });

    socket.on('disconnect', () => {
      console.log('Un cliente se ha desconectado');
    });
  });
};

const getIo = () => io;

module.exports = { initSocket, getIo };
