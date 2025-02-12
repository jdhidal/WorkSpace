const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = {
  createReservation: ({ input }) => {
    return new Promise((resolve, reject) => {
      const { facility_name, user_name, reservation_date, status } = input;
      const query = `INSERT INTO reservations (facility_name, user_name, reservation_date, status) VALUES (?, ?, ?, ?)`;
      
      db.query(query, [facility_name, user_name, reservation_date, status], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: result.insertId,
            ...input
          });
        }
      });
    });
  }
};
