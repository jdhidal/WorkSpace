const authService = require('./authService');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    console.log('Attempting to login with email:', email); // Log aquí para saber que estás intentando iniciar sesión con este correo
    
    const result = await authService.login(email, password);
    res.cookie('token', result.token, result.cookieOptions);
    res.json({ message: 'Logged in successfully' });

  } catch (err) {
    console.error('Error during login:', err); // Log en caso de error
    res.status(err.status || 500).json({ message: err.message });
  }
};
