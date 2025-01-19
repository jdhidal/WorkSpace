const bcrypt = require('bcryptjs');
const { createUserInDB } = require('./dbService');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createUserInDB(name, email, hashedPassword);

    res.status(201).json({ message: 'User created successfully', rowsAffected: result.affectedRows });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Error creating user' });
  }
};

module.exports = { createUser };
