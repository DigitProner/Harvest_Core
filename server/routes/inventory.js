import express from 'express';
import { getDb } from '../db/init.js';

const router = express.Router();

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const inventory = await db.all('SELECT * FROM feed_inventory');
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new inventory item
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const { feed_type, amount, unit } = req.body;
    const result = await db.run(
      'INSERT INTO feed_inventory (feed_type, amount, unit) VALUES (?, ?, ?)',
      [feed_type, amount, unit]
    );
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update inventory item
router.put('/:id', async (req, res) => {
  try {
    const db = getDb();
    const { feed_type, amount, unit } = req.body;
    await db.run(
      'UPDATE feed_inventory SET feed_type = ?, amount = ?, unit = ?, last_updated = CURRENT_TIMESTAMP WHERE id = ?',
      [feed_type, amount, unit, req.params.id]
    );
    res.json({ message: 'Inventory updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete inventory item
router.delete('/:id', async (req, res) => {
  try {
    const db = getDb();
    await db.run('DELETE FROM feed_inventory WHERE id = ?', req.params.id);
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;