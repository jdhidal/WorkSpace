const db = require('./dbConnection');

exports.checkUserExists = async (email) => {
  const connection = await db.getConnection();
  const [result] = await connection.execute('CALL AuthenticateUser(?)', [email]);
  await connection.release();
  return result[0][0].UserExists === 1;
};

exports.getPasswordByEmail = async (email) => {
  const connection = await db.getConnection();
  const [result] = await connection.execute('SELECT password FROM users WHERE email = ?', [email]);
  await connection.release();
  if (result.length === 0) throw { status: 401, message: 'Invalid credentials' };
  return result[0].password;
};
