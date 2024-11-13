import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db/config.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, role = 'user' } = req.body;
    
    const existingUser = await db.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: [email]
    });

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = crypto.randomUUID();
    
    await db.execute({
      sql: 'INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)',
      args: [userId, email, hashedPassword, role]
    });

    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });

    const user = result.rows[0];
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET
    );
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;