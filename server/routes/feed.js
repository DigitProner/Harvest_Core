import express from 'express';
import { db } from '../db/index.js';

const router = express.Router();

// Get all feed inventory
router.get('/inventory', async (req, res) => {
  try {
    const inventory = await db.all(`
      SELECT * FROM feed_inventory 
      ORDER BY last_updated DESC
    `);
    
    res.json(inventory.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      minimumLevel: item.minimum_level,
      lastUpdated: item.last_updated,
      status: getInventoryStatus(item.quantity, item.minimum_level)
    })));
  } catch (error) {
    console.error('Error fetching feed inventory:', error);
    res.status(500).json({ error: 'Failed to fetch feed inventory' });
  }
});

// Add new feed item
router.post('/inventory', async (req, res) => {
  const { name, quantity, unit, minimumLevel } = req.body;
  
  try {
    const result = await db.run(`
      INSERT INTO feed_inventory (name, quantity, unit, minimum_level, last_updated)
      VALUES (?, ?, ?, ?, datetime('now'))
    `, [name, quantity, unit, minimumLevel]);
    
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    console.error('Error adding feed item:', error);
    res.status(500).json({ error: 'Failed to add feed item' });
  }
});

// Update feed quantity
router.patch('/inventory/:id', async (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params;
  
  try {
    await db.run(`
      UPDATE feed_inventory 
      SET quantity = ?, last_updated = datetime('now')
      WHERE id = ?
    `, [quantity, id]);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating feed quantity:', error);
    res.status(500).json({ error: 'Failed to update feed quantity' });
  }
});

// Get feeding history for an animal
router.get('/history/:animalId', async (req, res) => {
  const { animalId } = req.params;
  
  try {
    const history = await db.all(`
      SELECT 
        f.*,
        u.name as staff_name
      FROM feeding_records f
      LEFT JOIN users u ON f.staff_id = u.id
      WHERE f.animal_id = ?
      ORDER BY f.timestamp DESC
    `, [animalId]);
    
    res.json(history.map(record => ({
      id: record.id,
      animalId: record.animal_id,
      feedType: record.feed_type,
      amount: record.amount,
      unit: record.unit,
      timestamp: record.timestamp,
      staffMember: record.staff_name,
      notes: record.notes
    })));
  } catch (error) {
    console.error('Error fetching feeding history:', error);
    res.status(500).json({ error: 'Failed to fetch feeding history' });
  }
});

// Add feeding record
router.post('/history', async (req, res) => {
  const { animalId, feedType, amount, unit, timestamp, staffId, notes } = req.body;
  
  try {
    const result = await db.run(`
      INSERT INTO feeding_records (
        animal_id, feed_type, amount, unit, 
        timestamp, staff_id, notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [animalId, feedType, amount, unit, timestamp, staffId, notes]);
    
    // Update inventory
    await db.run(`
      UPDATE feed_inventory
      SET quantity = quantity - ?,
          last_updated = datetime('now')
      WHERE name = ? AND unit = ?
    `, [amount, feedType, unit]);
    
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    console.error('Error adding feeding record:', error);
    res.status(500).json({ error: 'Failed to add feeding record' });
  }
});

function getInventoryStatus(quantity, minimumLevel) {
  if (quantity <= minimumLevel) return 'low';
  if (quantity >= minimumLevel * 2) return 'surplus';
  return 'normal';
}

export default router;