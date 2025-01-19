// src/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbService = require('./dbService');

class UserController {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const userExists = await dbService.authenticateUser(email);

      if (!userExists) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const storedPassword = await dbService.getUserPassword(email);

      const match = await bcrypt.compare(password, storedPassword);

      if (match) {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 3600000,
          sameSite: 'None',
          secure: false
        });

        res.json({ message: 'Logged in successfully' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = UserController;
