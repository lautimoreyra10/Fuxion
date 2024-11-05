const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // Incluye el rol aquí
    'secret_key',
    { expiresIn: '1h' } // Ajusta el tiempo de expiración según sea necesario
  );
};

module.exports = generateToken;