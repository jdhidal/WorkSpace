// src/dbService.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

class DBService {
  static async connect() {
    return mysql.createConnection(dbConfig);
  }

  static async authenticateUser(email) {
    const connection = await this.connect();
    const [result] = await connection.execute('CALL AuthenticateUser(?)', [email]);
    connection.end();
    return result[0][0].UserExists === 1;
  }

  static async getUserPassword(email) {
    const connection = await this.connect();
    const [result] = await connection.execute('SELECT password FROM users WHERE email = ?', [email]);
    connection.end();
    if (result.length > 0) {
      return result[0].password;
    }
    return null;
  }
}

module.exports = DBService;
