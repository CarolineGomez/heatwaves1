const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign(
    { user_id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };