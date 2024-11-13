import express from 'express';
import { getDb } from '../db/init.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
const db = getDb();

// Get all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await db.all('SELECT id, username, email, role FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await db.get('SELECT id, username, email, role FROM users WHERE id = ?', req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const result = await db.run(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role]
    );
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:id', auth, async (req, res) => {
  try {
    const { username, email, role } = req.body;
    await db.run(
      'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?',
      [username, email, role, req.params.id]
    );
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.run('DELETE FROM users WHERE id = ?', req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;