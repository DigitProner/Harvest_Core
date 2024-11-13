export async function up(db) {
  // Feed inventory table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS feed_inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity REAL NOT NULL DEFAULT 0,
      unit TEXT NOT NULL,
      minimum_level REAL NOT NULL DEFAULT 0,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Feeding records table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS feeding_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      animal_id INTEGER NOT NULL,
      feed_type TEXT NOT NULL,
      amount REAL NOT NULL,
      unit TEXT NOT NULL,
      timestamp DATETIME NOT NULL,
      staff_id INTEGER NOT NULL,
      notes TEXT,
      FOREIGN KEY (animal_id) REFERENCES livestock(id) ON DELETE CASCADE,
      FOREIGN KEY (staff_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Add some initial feed types
  await db.exec(`
    INSERT INTO feed_inventory (name, quantity, unit, minimum_level) VALUES
    ('Hay', 1000, 'kg', 200),
    ('Grain', 500, 'kg', 100),
    ('Silage', 2000, 'kg', 400),
    ('Concentrate', 300, 'kg', 50)
  `);
}

export async function down(db) {
  await db.exec('DROP TABLE IF EXISTS feeding_records');
  await db.exec('DROP TABLE IF EXISTS feed_inventory');
}