const jwt = require('jsonwebtoken');
const db = require('../config/connect_DB');


exports.authCheck = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = headerToken.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET); // Ensure JWT_SECRET is set in .env

    req.user = decoded; // Decoded token should include admin_id and role_name

    // Verify admin exists
    const query = 'SELECT * FROM admins WHERE admin_id = $1';
    const result = await db.query(query, [req.user.admin_id]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    next();
  } catch (err) {
    console.error('Error during auth check:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

exports.hrCheck = async (req, res, next) => {
  try {
    const query = 'SELECT * FROM admins WHERE admin_id = $1 AND role_name = $2';
    const result = await db.query(query, [req.user.admin_id, 'hr']);

    if (result.rows.length === 0) {
      return res.status(403).json({ message: 'Access Denied: HR Only' });
    }
    next();
  } catch (err) {
    console.error('Error during HR check:', err);
    res.status(500).json({ message: 'Server error during HR check' });
  }
};

exports.verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    res.status(200).json({ message: 'Token is valid', admin: decoded });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};



exports.marketingCheck = async (req, res, next) => {
   const client = await db.connect();
  try {
    const { admin_id, role_name } = req.user; // ตรงกับ token

    if (role_name !== 'marketing') {
      return res.status(403).json({ message: 'Access Denied: manager Only' });
    }

    const query = 'SELECT * FROM admins WHERE admin_id = $1';
    const result = await client.query(query, [admin_id]);

    if (result.rows.length === 0) {
      return res.status(403).json({ message: 'Manager not found' });
    }

    next();
  } catch (err) {
    console.error('Error during manager check:', err);
    res.status(500).json({ message: 'Error manager access denied' });
  } finally {
    client.release();
  }
};


exports.managerCheck = async (req, res, next) => {
  const client = await db.connect();
  try {
    const { admin_id, role_name } = req.user; // ตรงกับ token

    if (role_name !== 'manager') {
      return res.status(403).json({ message: 'Access Denied: manager Only' });
    }

    const query = 'SELECT * FROM admins WHERE admin_id = $1';
    const result = await client.query(query, [admin_id]);

    if (result.rows.length === 0) {
      return res.status(403).json({ message: 'Manager not found' });
    }

    next();
  } catch (err) {
    console.error('Error during manager check:', err);
    res.status(500).json({ message: 'Error manager access denied' });
  } finally {
    client.release();
  }
};

