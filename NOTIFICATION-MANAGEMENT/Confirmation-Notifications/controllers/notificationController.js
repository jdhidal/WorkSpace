// controllers/notificationController.js
const { getIo } = require('../config/socket');

const sendNotification = (message) => {
  const io = getIo();
  // Enviar una notificación a todos los clientes conectados
  io.emit('notification', { message });
};

module.exports = { sendNotification };
