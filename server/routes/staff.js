import express from 'express';
import { auth } from '../middleware/auth.js';
import { db } from '../index.js';

const router = express.Router();

// Get all staff members
router.get('/', auth, async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM staff ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single staff member
router.get('/:id', auth, async (req, res) => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM staff WHERE id = ?',
      args: [req.params.id]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Staff member not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create staff member
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, role, status } = req.body;
    const id = `staff_${Date.now()}`;

    await db.execute({
      sql: `INSERT INTO staff (id, name, email, phone, role, status)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [id, name, email, phone, role, status]
    });

    res.json({ id, message: 'Staff member added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update staff member
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, email, phone, role, status } = req.body;

    await db.execute({
      sql: `UPDATE staff 
            SET name = ?, email = ?, phone = ?, role = ?, status = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
      args: [name, email, phone, role, status, req.params.id]
    });

    res.json({ message: 'Staff member updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete staff member
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.execute({
      sql: 'DELETE FROM staff WHERE id = ?',
      args: [req.params.id]
    });

    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;