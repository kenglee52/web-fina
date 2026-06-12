const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/connect_DB');
exports.register = async (req, res) => {
  try {
    const { username, password, role_name, dept_id } = req.body;

    console.log('Register request body:', { username, password, role_name, dept_id });

    if (!username || !password || !role_name) {
      return res.status(400).json({ message: 'Please provide username, password, role_name, and dept_id if applicable' });
    }

    // ตรวจสอบ role_name ว่าถูกต้องไหม
    if (!['hr', 'marketing', 'manager'].includes(role_name)) {
      return res.status(400).json({ message: 'Invalid role. Must be hr, marketing, or manager' });
    }

    // ถ้า role_name เป็น manager ต้องมี dept_id
    if (role_name === 'manager' && !dept_id) {
      return res.status(400).json({ message: 'Manager must have a department id' });
    }

    // ตรวจสอบว่ามี username นี้แล้วหรือยัง
    const checkQuery = 'SELECT * FROM admins WHERE username = $1';
    const existing = await db.query(checkQuery, [username]);

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // เข้ารหัส password
    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึกข้อมูลลงตาราง
    const insertQuery = `
      INSERT INTO admins (username, password, role_name, dept_id)
      VALUES ($1, $2, $3, $4)
      RETURNING admin_id, username, role_name, dept_id
    `;
    const result = await db.query(insertQuery, [username, hashedPassword, role_name, dept_id || null]);

    res.status(201).json({
      message: 'Admin registered successfully',
      admin: result.rows[0],
    });
  } catch (err) {
    console.error('Error during admin registration:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login request body:', { username, password });

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    if (!process.env.SECRET) {
      console.error('JWT secret is not defined');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    // ✅ ใช้ชื่อ table ให้ตรงกับในฐานข้อมูล (admins)
    const loginQuery = `
  SELECT a.admin_id, a.username, a.role_name, a.dept_id, d.dept_name AS department_name, a.password
  FROM admins a
  LEFT JOIN departments d ON a.dept_id = d.dept_id
  WHERE a.username = $1
`;

    db.query(loginQuery, [username], async (err, results) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      console.log('Query results:', results.rows);

      if (results.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const admin = results.rows[0];

      const isMatch = await bcrypt.compare(password, admin.password);
      console.log('Password match:', isMatch);

      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      try {
        const token = jwt.sign(
          { admin_id: admin.admin_id, username: admin.username, role_name: admin.role_name },
          process.env.SECRET,
          { expiresIn: '15d' }
        );

        res.status(200).json({
          message: 'Login successful',
          token,
         admin: {
    admin_id: admin.admin_id,

    username: admin.username,
    role_name: admin.role_name,
    department_id: admin.department_id,
    department_name: admin.department_name,
  },
        });
      } catch (jwtErr) {
        console.error('Error signing JWT:', jwtErr);
        return res.status(500).json({ message: 'Error generating token' });
      }
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.currentUser = async (req, res) => {
  try {
    const { admin_id } = req.user; // ใช้ admin_id ตาม JWT payload

    const query = 'SELECT admin_id, username, role_name FROM admins WHERE admin_id = $1';
    const result = await db.query(query, [admin_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const admin = result.rows[0];
    res.status(200).json({
      message: 'Current admin retrieved successfully',
      admin: {
        admin_id: admin.admin_id,
        username: admin.username,
        role_name: admin.role_name,
      },
    });
  } catch (err) {
    console.error('Error retrieving current admin:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
