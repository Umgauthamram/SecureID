const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing in environment variables.");
    return res.status(500).json({ message: 'Internal server error. Authentication misconfiguration.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token. Access denied.' });
    } else {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  }
};

module.exports = authMiddleware;
