const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const saltRounds = 10;

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const existing = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashed = await bcrypt.hash(password, saltRounds);

    const result = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashed, 'user']
    );

    const token = jwt.sign(
      { userId: result.rows[0].id, email: result.rows[0].email, name: result.rows[0].name, isAdmin: false },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({ token, user: result.rows[0] });
  } catch (error) {
    console.error('Signup error:', error.message);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const result = await db.query('SELECT id, name, email, password, role FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in environment variables.');
      return res.status(500).json({ message: 'Server misconfiguration: JWT_SECRET is missing.' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name, isAdmin: user.role === 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
