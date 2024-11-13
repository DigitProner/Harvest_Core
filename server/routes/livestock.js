import express from 'express';
import { getDb } from '../db/init.js';

const router = express.Router();

// Get all livestock
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const livestock = await db.all('SELECT * FROM livestock');
    res.json(livestock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single livestock by ID
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const livestock = await db.get('SELECT * FROM livestock WHERE id = ?', req.params.id);
    if (!livestock) {
      return res.status(404).json({ error: 'Livestock not found' });
    }
    res.json(livestock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new livestock
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const { name, category, breed, birth_date, weight, status } = req.body;
    const result = await db.run(
      'INSERT INTO livestock (name, category, breed, birth_date, weight, status) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, breed, birth_date, weight, status]
    );
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update livestock
router.put('/:id', async (req, res) => {
  try {
    const db = getDb();
    const { name, category, breed, birth_date, weight, status } = req.body;
    await db.run(
      'UPDATE livestock SET name = ?, category = ?, breed = ?, birth_date = ?, weight = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, category, breed, birth_date, weight, status, req.params.id]
    );
    res.json({ message: 'Livestock updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete livestock
router.delete('/:id', async (req, res) => {
  try {
    const db = getDb();
    await db.run('DELETE FROM livestock WHERE id = ?', req.params.id);
    res.json({ message: 'Livestock deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;