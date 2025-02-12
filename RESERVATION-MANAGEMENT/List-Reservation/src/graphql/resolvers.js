const { db } = require('../db/db');  // Asegúrate de que esté en la ruta correcta

const root = {
  listReservations: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM reservations', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = { root };
