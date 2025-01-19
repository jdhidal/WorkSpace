const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('./userModel');

exports.login = async (email, password) => {
  const userExists = await userModel.checkUserExists(email);

  if (!userExists) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  const storedPassword = await userModel.getPasswordByEmail(email);

  const isPasswordValid = await bcrypt.compare(password, storedPassword);
  if (!isPasswordValid) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return {
    token,
    cookieOptions: {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'None',
      secure: process.env.NODE_ENV === 'production',
    },
  };
};
