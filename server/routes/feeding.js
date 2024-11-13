import express from 'express';
import { getDb } from '../db/init.js';

const router = express.Router();

// Get feed inventory
router.get('/inventory', async (req, res) => {
  try {
    const db = getDb();
    const inventory = await db.all('SELECT * FROM feed_inventory');
    res.json(inventory);
  } catch (error) {
    console.error('Error fetching feed inventory:', error);
    res.status(500).json({ error: 'Failed to fetch feed inventory' });
  }
});

// Add new feed to inventory
router.post('/inventory', async (req, res) => {
  try {
    const { name, type, quantity, unit } = req.body;
    const db = getDb();
    
    const result = await db.run(
      'INSERT INTO feed_inventory (name, type, quantity, unit) VALUES (?, ?, ?, ?)',
      [name, type, quantity, unit]
    );
    
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    console.error('Error adding feed:', error);
    res.status(500).json({ error: 'Failed to add feed' });
  }
});

// Get feeding records
router.get('/records', async (req, res) => {
  try {
    const db = getDb();
    const records = await db.all(`
      SELECT fr.*, fi.name as feed_name, fi.type as feed_type
      FROM feeding_records fr
      JOIN feed_inventory fi ON fr.feed_id = fi.id
      ORDER BY fr.fed_at DESC
    `);
    res.json(records);
  } catch (error) {
    console.error('Error fetching feeding records:', error);
    res.status(500).json({ error: 'Failed to fetch feeding records' });
  }
});

// Add new feeding record
router.post('/records', async (req, res) => {
  try {
    const { livestock_id, feed_id, quantity, fed_by, notes } = req.body;
    const db = getDb();
    
    // Start transaction
    await db.run('BEGIN TRANSACTION');

    // Add feeding record
    const result = await db.run(
      'INSERT INTO feeding_records (livestock_id, feed_id, quantity, fed_by, notes) VALUES (?, ?, ?, ?, ?)',
      [livestock_id, feed_id, quantity, fed_by, notes]
    );

    // Update inventory
    await db.run(
      'UPDATE feed_inventory SET quantity = quantity - ? WHERE id = ?',
      [quantity, feed_id]
    );

    await db.run('COMMIT');
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    await db.run('ROLLBACK');
    console.error('Error adding feeding record:', error);
    res.status(500).json({ error: 'Failed to add feeding record' });
  }
});

export default router;