import express from 'express';
import { auth } from '../middleware/auth.js';
import { db } from '../index.js';

const router = express.Router();

// Get livestock statistics
router.get('/livestock-stats', auth, async (req, res) => {
  try {
    const stats = await db.execute(`
      SELECT 
        category,
        COUNT(*) as total,
        SUM(CASE WHEN status = 'healthy' THEN 1 ELSE 0 END) as healthy,
        SUM(CASE WHEN status = 'sick' THEN 1 ELSE 0 END) as sick
      FROM livestock
      GROUP BY category
    `);

    res.json(stats.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get inventory statistics
router.get('/inventory-stats', auth, async (req, res) => {
  try {
    const stats = await db.execute(`
      SELECT 
        category,
        COUNT(*) as total_items,
        SUM(quantity) as total_quantity,
        SUM(price * quantity) as total_value
      FROM inventory
      GROUP BY category
    `);

    res.json(stats.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get staff statistics
router.get('/staff-stats', auth, async (req, res) => {
  try {
    const stats = await db.execute(`
      SELECT 
        role,
        COUNT(*) as total,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active
      FROM staff
      GROUP BY role
    `);

    res.json(stats.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get activity timeline
router.get('/activity-timeline', auth, async (req, res) => {
  try {
    // This would typically come from an activities table
    // For now, we'll combine recent changes from different tables
    const timeline = await db.execute(`
      SELECT 
        'livestock' as type,
        id,
        name as title,
        created_at as timestamp
      FROM livestock
      WHERE created_at >= datetime('now', '-7 days')
      UNION ALL
      SELECT 
        'inventory' as type,
        id,
        name as title,
        created_at as timestamp
      FROM inventory
      WHERE created_at >= datetime('now', '-7 days')
      ORDER BY timestamp DESC
      LIMIT 20
    `);

    res.json(timeline.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;