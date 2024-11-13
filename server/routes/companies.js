import express from 'express';
import { getDb } from '../db/init.js';

export const router = express.Router();

// Get company settings
router.get('/settings', async (req, res) => {
  try {
    const db = await getDb();
    const company = await db.get('SELECT * FROM companies LIMIT 1');
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update company settings
router.put('/settings', async (req, res) => {
  try {
    const db = await getDb();
    const {
      name, logo, address, city, state, zipCode, country,
      phone, email, website, description, established,
      size, employeeCount, farmType, weatherApiKey,
      latitude, longitude
    } = req.body;

    await db.run(
      `UPDATE companies SET
        name = ?, logo = ?, address = ?, city = ?, state = ?,
        zipCode = ?, country = ?, phone = ?, email = ?, website = ?,
        description = ?, established = ?, size = ?, employeeCount = ?,
        farmType = ?, weatherApiKey = ?, latitude = ?, longitude = ?,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = 1`,
      [name, logo, address, city, state, zipCode, country,
       phone, email, website, description, established,
       size, employeeCount, farmType, weatherApiKey,
       latitude, longitude]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});