import express from 'express';
import { getDb } from '../db/init.js';

const router = express.Router();

// Get all crops
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const crops = await db.all('SELECT * FROM crops ORDER BY created_at DESC');
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single crop
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const crop = await db.get('SELECT * FROM crops WHERE id = ?', req.params.id);
    if (!crop) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    res.json(crop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new crop
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const { name, variety, planting_date, harvest_date, status, field_location } = req.body;
    const result = await db.run(
      'INSERT INTO crops (name, variety, planting_date, harvest_date, status, field_location) VALUES (?, ?, ?, ?, ?, ?)',
      [name, variety, planting_date, harvest_date, status, field_location]
    );
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update crop
router.put('/:id', async (req, res) => {
  try {
    const db = getDb();
    const { name, variety, planting_date, harvest_date, status, field_location } = req.body;
    await db.run(
      'UPDATE crops SET name = ?, variety = ?, planting_date = ?, harvest_date = ?, status = ?, field_location = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, variety, planting_date, harvest_date, status, field_location, req.params.id]
    );
    res.json({ message: 'Crop updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete crop
router.delete('/:id', async (req, res) => {
  try {
    const db = getDb();
    await db.run('DELETE FROM crops WHERE id = ?', req.params.id);
    res.json({ message: 'Crop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;