import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db = null;

export async function initDb() {
  if (db) return db;
  
  db = await open({
    filename: ':memory:', // In-memory database for development
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS feed_inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      quantity REAL NOT NULL,
      unit TEXT NOT NULL,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS feeding_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      livestock_id INTEGER NOT NULL,
      feed_id INTEGER NOT NULL,
      quantity REAL NOT NULL,
      fed_by TEXT NOT NULL,
      fed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      notes TEXT,
      FOREIGN KEY (feed_id) REFERENCES feed_inventory(id)
    );
  `);

  // Insert some sample data
  await db.run(`
    INSERT INTO feed_inventory (name, type, quantity, unit) 
    VALUES 
      ('Hay', 'Forage', 1000, 'kg'),
      ('Grain Mix', 'Concentrate', 500, 'kg'),
      ('Silage', 'Forage', 2000, 'kg')
  `);

  return db;
}

export function getDb() {
  if (!db) throw new Error('Database not initialized');
  return db;
}