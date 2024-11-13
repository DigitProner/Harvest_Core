import express from 'express';
import { auth, checkRole } from '../middleware/auth.js';
import { db } from '../index.js';

const router = express.Router();

// Middleware to ensure admin access
router.use(auth, checkRole(['admin']));

// Get all companies
router.get('/companies', async (req, res) => {
  try {
    const result = await db.execute(`
      SELECT 
        c.*,
        COUNT(u.id) as user_count
      FROM companies c
      LEFT JOIN users u ON u.company_id = c.id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single company
router.get('/companies/:id', async (req, res) => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM companies WHERE id = ?',
      args: [req.params.id]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create company
router.post('/companies', async (req, res) => {
  try {
    const { name, email, status, subscription } = req.body;
    const id = `company_${Date.now()}`;

    await db.execute({
      sql: `INSERT INTO companies (id, name, email, status, subscription)
            VALUES (?, ?, ?, ?, ?)`,
      args: [id, name, email, status, subscription]
    });

    res.json({ id, message: 'Company created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update company
router.put('/companies/:id', async (req, res) => {
  try {
    const { name, email, status, subscription } = req.body;

    await db.execute({
      sql: `UPDATE companies 
            SET name = ?, email = ?, status = ?, subscription = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
      args: [name, email, status, subscription, req.params.id]
    });

    res.json({ message: 'Company updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete company
router.delete('/companies/:id', async (req, res) => {
  try {
    await db.execute({
      sql: 'DELETE FROM companies WHERE id = ?',
      args: [req.params.id]
    });

    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const result = await db.execute(`
      SELECT 
        u.*,
        c.name as company_name
      FROM users u
      LEFT JOIN companies c ON u.company_id = c.id
      ORDER BY u.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single user
router.get('/users/:id', async (req, res) => {
  try {
    const result = await db.execute({
      sql: `SELECT u.*, c.name as company_name
            FROM users u
            LEFT JOIN companies c ON u.company_id = c.id
            WHERE u.id = ?`,
      args: [req.params.id]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create user
router.post('/users', async (req, res) => {
  try {
    const { name, email, password, role, companyId, status } = req.body;
    const id = `user_${Date.now()}`;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.execute({
      sql: `INSERT INTO users (id, name, email, password, role, company_id, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)`, <boltAction type="file" filePath="server/routes/admin.js">      args: [id, name, email, hashedPassword, role, companyId, status]
    });

    res.json({ id, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, role, companyId, status } = req.body;

    await db.execute({
      sql: `UPDATE users 
            SET name = ?, email = ?, role = ?, company_id = ?, status = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?`,
      args: [name, email, role, companyId, status, req.params.id]
    });

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    await db.execute({
      sql: 'DELETE FROM users WHERE id = ?',
      args: [req.params.id]
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get admin dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const [companies, users, subscriptions] = await Promise.all([
      db.execute('SELECT COUNT(*) as total, status FROM companies GROUP BY status'),
      db.execute('SELECT COUNT(*) as total, role FROM users GROUP BY role'),
      db.execute('SELECT COUNT(*) as total, subscription FROM companies GROUP BY subscription')
    ]);

    res.json({
      companies: companies.rows,
      users: users.rows,
      subscriptions: subscriptions.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;