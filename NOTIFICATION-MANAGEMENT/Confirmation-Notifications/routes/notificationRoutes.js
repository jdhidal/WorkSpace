// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const { sendNotification } = require('../controllers/notificationController');

router.post('/send-notification', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).send('El mensaje es obligatorio');
  }

  sendNotification(message);

  return res.status(200).send('Notificación enviada');
});

module.exports = router;
